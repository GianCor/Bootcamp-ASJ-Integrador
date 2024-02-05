import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { ProductsService } from '../../../services/products.service';
import { NgForm, NgModel } from '@angular/forms';
import { Provider } from 'src/app/models/providerModel';
import { Product } from 'src/app/models/productModel';
import { category } from 'src/app/models/categoryModel';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css'],
})
export class ProductsAddComponent implements OnInit {
  providers: Provider[] = [];
  products: Product[] = [];
  categories: category[] = [];
  showError: boolean = false;
  showSuccess: boolean = false;
  selectedCategory = null;
  selectedSupplierCode = null;
  message: string = '';
  product: Product = {
    id:0,
    sku: '',
    supplier_id: 0,
    supplierName: '',
    category: {
      id:0,
      name:''
    },
    name: '',
    description: '',
    price: '',
  };

  constructor(
    private providersService: ProvidersService,
    private productsService: ProductsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getProviders();
    this.getProducts();
    this.getCategories();
  }

  onProviderChange(provider: any) {
    this.product.supplier_id = provider.value.id;
    this.product.supplierName = provider.value.name;
  }

  onCategoryChange(category: any){
    this.product.category = category.value;
  }

  getProviders() {
    this.providersService.getData().subscribe(response=>{
      this.providers = response;
    });
  }

  getProducts() {
    this.productsService.getData().subscribe(response =>{
      this.products = response;
    });
  }

  setProviderName(id:any){
    this.product.supplierName = id.value
  }

  pushProducts(form: NgForm) {
    if (form.valid) {
      if (
        this.isUniqueId(this.product.sku)
      ) {
        this.productsService.postData(this.product).subscribe(response => console.log(response));
        this.message = 'Proveedor agregado exitosamente';
        this.showError = false;
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
          this.message = '';
        }, 3000);
        form.reset();
      } else {
        this.message =
          'Código de producto debe ser único, precio debe ser numérico';
        this.showSuccess = false;
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
          this.message = '';
        }, 3000);
      }
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response =>{
      this.categories = response;
    });
  }

  isUniqueId(sku: string): any {
      const found = this.products.some((product) => product.sku == sku);
      return !found;
  };

  isProviderInvalid() {
    return this.product.supplier_id;
  }
}
