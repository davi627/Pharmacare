import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MpesaService {
  private baseUrl: string = 'http://localhost:3000/mpesa'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  /**
   * Initiates an M-Pesa STK Push request.
   * @param payload - The payload containing the amount and phone number.
   * @returns Observable of the response.
   */
  stkPush(payload: { amount: number; phoneNumber: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/stkpush`, payload);
  }
}
