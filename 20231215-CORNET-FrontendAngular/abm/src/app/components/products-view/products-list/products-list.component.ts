import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  productsData: any[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getProductsData();
    console.log(this.productsData)
  }

  getProductsData() {
    this.productsData = this.productsService.getData();
  }
}
