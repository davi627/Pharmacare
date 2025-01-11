import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/Products/Products';
  private getUrl = 'http://localhost:3000/Products/Products';

  constructor(private http: HttpClient) { }

  //posting the products
  addProduct(formData:FormData): Observable<any>{
    return this.http.post<any>(this.apiUrl, formData);
  }

  //getting all products
  getAllProducts(): Observable<any>{
    return this.http.get<any>(this.getUrl);
  }
}
