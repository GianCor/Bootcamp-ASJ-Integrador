import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { ProductsService } from  '../../../services/products.service';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {
  providers: any[] = [];
  products: any[] = [];
  product={
    id:'',
    provider:'',
    category:'',
    name:'',
    description:'',
    price:'',
  }

  constructor(
    private providersService: ProvidersService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getProviders();
    this.getProducts();
  }

  getProviders() {
    this.providers = this.providersService.getData();
  }

  getProducts() {
    this.products = this.productsService.getData();
  }

  pushProducts() {
    this.products.push(this.product);
    this.productsService.postData(this.products)
    this.clearForm();
  }
  
  clearForm() {
    this.product = {
      id:'',
      provider:'',
      category:'',
      name:'',
      description:'',
      price:'',
    };
  }
}