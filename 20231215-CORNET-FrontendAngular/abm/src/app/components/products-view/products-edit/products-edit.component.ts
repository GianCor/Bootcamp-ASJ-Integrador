import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { ProductsService } from '../../../services/products.service';
import { NgForm } from '@angular/forms';
import { Provider } from 'src/app/models/providerModel';
import { Product } from 'src/app/models/productModel';
import { category } from 'src/app/models/categoryModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent {
  providers: Provider[] = [];
  products: Product[] = [];
  categories: category[] = [];
  showError: boolean = false;
  showSuccess: boolean = false;
  message: string = '';
  product: Product = {
    id:0,
    sku: '',
    provider_id: 0,
    providerName: '',
    category: '',
    name: '',
    description: '',
    price: '',
  };

  constructor(
    private providersService: ProvidersService,
    private productsService: ProductsService,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.product = this.productsService.getProductById(productId);
      console.log(this.product)
    });
    this.getProviders();
    this.getProducts();
    this.getCategories();
  }

  getProviders() {
    this.providersService.getData().subscribe(response=>{
      this.providers = response;
    });
  }

  getProducts() {
    this.products = this.productsService.getData();
  }

  pushProducts(form: NgForm) {
    if (form.valid) {
      if (
        this.isNumeric(this.product.price)
      ) {
        this.productsService.updateProductAndProvider(form.value)
        this.productsService.updateProduct(form.value);
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

  pushProductsToProvider(product: Product) {
    const index = this.providers.findIndex(
      (provider) => product.provider_id == provider.id
    );
    if (index != -1) {
      if (this.providers[index].products == undefined) {
        this.providers[index].products = [product];
      } else {
        this.providers[index].products?.push(product);
      }
      this.providersService.updateProvider(this.providers[index]);
    }
  }

  getCategories() {
    this.categories = this.productsService.getCategories();
  }

  isUniqueId(id: string): any {
    this.getProducts();
    const found = this.products.some((product) => product.sku == id);
    return !found;
  }
  isNumeric(price: string) {
    const isNumeric: boolean = /^\d+$/.test(price);
    return isNumeric;
  }
}
