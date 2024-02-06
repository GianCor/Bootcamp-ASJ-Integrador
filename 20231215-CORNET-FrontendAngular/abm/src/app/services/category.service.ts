import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  url:string = "http://localhost:8080/category";
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  postCategory(category :Category): Observable <Category>{
    return this.http.post<Category>(this.url, category);
  }

  deleteCategory(field: Category): Observable <Category>{
    return this.http.delete<Category>(this.url + `/${field.id}`)
  }

  updateCategory(category: Category): Observable <Category>{
    return this.http.put<Category>(this.url + `/${category.id}`, category)
  }
}
