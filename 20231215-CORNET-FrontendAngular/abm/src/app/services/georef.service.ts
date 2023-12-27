import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeorefService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>('../../assets/countries+states+cities.json');
  }
}
