import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tax } from '../models/providerModel';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private http: HttpClient) {}

  url:string = "http://localhost:8080/tax";
  getTaxes(): Observable<Tax[]> {
    return this.http.get<Tax[]>(this.url);
  }

  postTax(tax :Tax): Observable <Tax>{
    return this.http.post<Tax>(this.url, tax);
  }

  deleteTax(tax: Tax): Observable <Tax>{
    return this.http.delete<Tax>(this.url + `/${tax.id}`)
  }

  updateTax(tax: Tax): Observable <Tax>{
    return this.http.put<Tax>(this.url + `/${tax.id}`, tax)
  }
}
