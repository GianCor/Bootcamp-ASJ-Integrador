import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Field } from '../models/providerModel';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  constructor(private http: HttpClient) {}

  url:string = "http://localhost:8080/field";
  getFields(): Observable<Field[]> {
    return this.http.get<Field[]>(this.url + "/active");
  }
  postField(field :Field): Observable <Field>{
    return this.http.post<Field>(this.url, field);
  }

  deleteField(field: Field): Observable <Field>{
    return this.http.delete<Field>(this.url + `/${field.id}`)
  }

  updateField(field: Field): Observable <Field>{
    return this.http.put<Field>(this.url + `/${field.id}`, field)
  }
}
