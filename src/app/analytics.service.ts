import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PaymentMethodAnalytics {
  _id: {
    method: string;
    month: number;
    year: number;
  };
  totalAmount: number;
  transactionCount: number;
}

interface SalesAnalytics {
  weekly: any[];
  monthly: any[];
  yearly: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  getPaymentMethodAnalytics(): Observable<PaymentMethodAnalytics[]> {
    return this.http.get<PaymentMethodAnalytics[]>(`${this.apiUrl}/payment-analytics`);
  }

  getSalesAnalytics(): Observable<SalesAnalytics> {
    return this.http.get<SalesAnalytics>(`${this.apiUrl}/sales-analytics`);
  }
}