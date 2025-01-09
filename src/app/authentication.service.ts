import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000/Auth/Register';
  private loginUrl = 'http://localhost:3000/Auth';


  constructor(private http:HttpClient) { }

  registerUser(userData:any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  login(userData: { email: string; password: string; role: string }): Observable<any> {
    // Assuming you have an API endpoint for login
    return this.http.post<any>(`${this.loginUrl}/login`, userData);
  }
}
