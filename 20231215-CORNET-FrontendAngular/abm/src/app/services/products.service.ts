import { Injectable } from '@angular/core';
import { category } from '../models/categoryModel';
import { categories } from '../data/categories';
import { ProvidersService } from './providers.service';
import { BridgeService } from './bridge.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/productModel';
import { Observable } from 'rxjs';

const categoriesList: category[] = categories;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private bridgeService: BridgeService,
    private http: HttpClient
  ) {}

  url: string = "http://localhost:8080/product"
  data: any = [];
  providers: any = [];
  categoriesList = categoriesList;
  

  getData() :Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }

  postData(product: any) {
    return this.http.post<any>(this.url, product);
  }

  deleteProducts(product: any) {
    return this.http.delete(this.url + `/${product.id}`)
  }

  getProductById(id: string):Observable<Product> {
    return this.http.get<Product>(this.url + `/${id}`)
  }

  updateProduct(updatedProduct: any) {
    return this.http.put(this.url + `/${updatedProduct.id}`, updatedProduct)
  }
}
