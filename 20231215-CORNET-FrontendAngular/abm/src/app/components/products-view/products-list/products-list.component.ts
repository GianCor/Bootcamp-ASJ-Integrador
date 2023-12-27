import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  productsData: Product[] = [];

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.getProductsData();
    console.log(this.productsData)
  }

  getProductsData() {
    this.productsData = this.productsService.getData();
  }

  deleteProduct(product:any){
    this.productsService.deleteProducts(product)
    this.getProductsData();
  }

  editProduct(product:any){
    this.router.navigate(['/products/edit', product.id]);
  }
}
