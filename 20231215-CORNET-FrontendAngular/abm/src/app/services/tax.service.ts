import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private http: HttpClient) {}

  url:string = "http://localhost:8080/tax";
  getTaxes(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
