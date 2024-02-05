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
  productsData: any[] = [];

  sortByPrice:boolean = false;
  sortByPriceDesc:boolean = false;
  search:string = ""

  show:boolean = true

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.getProductsData();
  }

  getProductsData() {
    this.productsService.getData().subscribe(response => {
      this.productsData = response
      if(this.productsData.length === 0){
        this.show = !this.show
      }
    });
  }

  deleteProduct(product:any){
    this.productsService.deleteProducts(product).subscribe(response =>{
      console.log(response)
      this.getProductsData();
    })
  }

  editProduct(product:any){
    this.router.navigate(['/products/edit', product.id]);
  }
}
