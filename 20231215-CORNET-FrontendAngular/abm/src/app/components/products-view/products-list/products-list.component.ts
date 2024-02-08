import { Component, OnInit, Provider, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/models/productModel';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProvidersService } from 'src/app/services/providers.service';

import { inject, TemplateRef } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  productsData: any[] = [];
  @ViewChild('modal') modal: any;
  search:string = ""
  selectedCategory = '';
  categoryData: Category[] = []
  show:boolean = true
  sortByPriceAsc: boolean = false;
  sortByPriceDesc: boolean = false;

  constructor(private productsService: ProductsService, private router: Router, private categoryService: CategoryService, private providerService: ProvidersService) { }

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
      console.log(this.productsData)
    });
  }

  deleteProduct(product:any){
    product.deleted = true;
    this.productsService.updateProduct(product).subscribe(response =>{
      console.log(response)
      this.getProductsData();
    })
  }


  message: string = '';
  retrieveProduct(product: Product, content: TemplateRef<any>){
    this.providerService.getProviderById(product.supplier_id.toString()).subscribe(supplier=>{
      if(!supplier.deleted){
        product.deleted = false;
        this.productsService.updateProduct(product).subscribe(response =>{
          console.log(response)
          this.getProductsData();
        })
      } else {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then()
        this.message = `Debe habilitar al proveedor "${supplier.name}" de codigo: ${supplier.supplierCode} antes de habilitar el producto "${product.name}" nuevamente`
      }
    })
  }

  editProduct(product:any){
    this.router.navigate(['/products/edit', product.id]);
  }

  private modalService = inject(NgbModal);
	closeResult = '';

  retrieveSupplier(){

  }
}
