import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class GeorefService {
  private apiUrl = 'https://api.countrystatecity.in/v1/countries';
  private apiKey = 'U1BiM1NjTHNucjZSM0dyVjBtVG9hbGVWeHlQYkh3VjAzczZKaVFsOQ=='; // Reemplaza 'API_KEY' con tu clave API

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    const headers = new HttpHeaders().set('X-CSCAPI-KEY', this.apiKey);

    return this.http.get<any>(this.apiUrl, { headers: headers });
  }
  getStatesByCountry(ISO2: string): Observable<any> {
    const headers = new HttpHeaders().set('X-CSCAPI-KEY', this.apiKey);

    return this.http.get<any>(`${this.apiUrl}/${ISO2}/states`, {
      headers: headers,
    });
  }
  getCitiesByCountryAndState(CISO: string, SISO: string): Observable<any> {
    const headers = new HttpHeaders().set('X-CSCAPI-KEY', this.apiKey);

    return this.http.get<any>(`${this.apiUrl}/${CISO}/states/${SISO}/cities`, {
      headers: headers,
    });
  }
}
