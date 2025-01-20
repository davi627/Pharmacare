import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {
  private apiUrl = 'http://localhost:3000/prescriptions/Prescriptions';

  constructor( private http: HttpClient) { }

  //posting the prescriptions
  addPrescription(formData:FormData): Observable<any>{
    return this.http.post<any>(this.apiUrl, formData);
  }
  
}
