import { Injectable } from '@angular/core';
import { products } from '../data/products';

let data = products;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getData() {
    return data;
  }

  getDataProviders(){
    return
  }

  postData(arr: any[]) {
    data = arr;
  }
  
}
