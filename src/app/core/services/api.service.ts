import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'http://ec2-52-203-6-72.compute-1.amazonaws.com:8000';
  private optionsHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(private http: HttpClient) { }

  createProduct(data: Product): Observable<any> {
    return this.http.post(`${this.baseURL}/products/create`, JSON.stringify(data), this.optionsHeader);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseURL}/products/list`, this.optionsHeader)
  }

  editProduct(id: string, data: Product): Observable<any> {
    return this.http.put(`${this.baseURL}/products/${id}/update`, JSON.stringify(data), this.optionsHeader)
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/products/${id}/delete`, this.optionsHeader)
  }
}
