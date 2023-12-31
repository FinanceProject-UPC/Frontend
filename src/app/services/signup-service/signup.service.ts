import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

import {catchError, Observable, retry, throwError} from "rxjs";
import {SignupData} from "../../shared/interfaces/signupdata";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private basePath = 'https://my-json-server.typicode.com/FinanceProject-UPC/Backend';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message}`);
    } else {

      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    return throwError(() => new Error('Something happened with request, please try again later'));
  }

    createStudent(item: SignupData): Observable<SignupData> {

        const { id, ...dataWithoutId } = item;
        return this.http.post<SignupData>(
            `${this.basePath}/users`,
            dataWithoutId,  // Enviar solo los datos del estudiante, sin 'id'
            this.httpOptions
        ).pipe(
            retry(2),
            catchError(this.handleError)
        );
    }


}
