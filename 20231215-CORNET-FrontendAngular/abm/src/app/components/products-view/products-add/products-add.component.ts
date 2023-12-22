import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { ProductsService } from '../../../services/products.service';
import { Provider } from 'src/app/models/providerModel';
import { Product } from 'src/app/models/productModel';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {
  providers: Provider[] = [];
  products: Product[] = [];
  product: Product = { // Inicializar la variable 'product'
    id: 0,
    provider: '',
    category: '',
    name: '',
    description: '',
    price: 0
  };


  constructor(
    private providersService: ProvidersService,
    private productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.getProviders();
    this.getProducts();
  }

  getProviders() {
    this.providers = this.providersService.getData();
    console.log(this.providers);
  }

  getProducts() {
    this.products = this.productsService.getData();
  }

  pushProducts() {
    this.products.push(this.product);
    this.productsService.postData(this.products);
  }
}