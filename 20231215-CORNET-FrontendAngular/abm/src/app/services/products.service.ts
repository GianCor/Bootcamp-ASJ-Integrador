import { Injectable } from '@angular/core';
import { products } from '../data/products';
import { Product } from '../models/productModel';

let data:Product[] = products;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getData() {
    return data;
  }

  postData(arr: Product[]) {
    data = arr;
  }
  
}
