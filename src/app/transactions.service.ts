import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private getUrl='http://localhost:3000/transactions/transactions'

  constructor(private http:HttpClient) { }

  getTransactions(): Observable<any>{
    return this.http.get<any>(this.getUrl);
  }
}
