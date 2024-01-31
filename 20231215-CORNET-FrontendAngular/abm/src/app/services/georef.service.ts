import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeorefService {
  constructor(private http: HttpClient) {}

  url:string = "http://localhost:8080/geolocation";
  getCountries(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
