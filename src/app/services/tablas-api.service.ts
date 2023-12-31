import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankFee } from '../shared/interfaces/bank-fee';
import { TableFee } from '../shared/Classes/table-fee';

@Injectable({
  providedIn: 'root',
})
export class TablasApiService {
  private apiUrl =
    'https://my-json-server.typicode.com/FinanceProject-UPC/Backend';

  constructor(private http: HttpClient) {}

  getDatos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/table`);
  }

  sendDataToAPI(data: TableFee) {
    return this.http.post<any>(`${this.apiUrl}/table`, data);
  }

  deleteDataFromAPI(id: number) {
    console.log(`Enviando solicitud DELETE para el ID: ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/table/${id}`);
  }
}
