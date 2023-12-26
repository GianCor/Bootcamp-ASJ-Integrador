import { Injectable } from '@angular/core';
import { products } from '../data/products';
import { Product } from '../models/productModel';
import { category } from '../models/categoryModel';
import { categories } from '../data/categories';

const data:Product[] = products;
const categoriesList:category[] = categories

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  data = data
  categoriesList = categoriesList

  getData() {
    return this.data;
  }

  postData(arr: Product[]) {
    this.data = arr;
  }
  
  getCategories(){
    return this.categoriesList
  }

}
