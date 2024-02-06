import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/models/productModel';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  productsData: any[] = [];

  search:string = ""
  selectedCategory = '';
  categoryData: Category[] = []
  show:boolean = true
  sortByPriceAsc: boolean = false;
  sortByPriceDesc: boolean = false;

  constructor(private productsService: ProductsService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getProductsData();
  }

  getProductsData() {
    this.productsService.getData().subscribe(response => {
      this.productsData = response
      if(this.productsData.length === 0){
        this.show = !this.show
      }
      this.categoryService.getCategories().subscribe(response => this.categoryData = response)
    });
  }

  deleteProduct(product:any){
    product.delted = true;
    this.productsService.updateProduct(product).subscribe(response =>{
      console.log(response)
      this.getProductsData();
    })
  }

  editProduct(product:any){
    this.router.navigate(['/products/edit', product.id]);
  }
}
