import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { ProductsService } from '../../../services/products.service';
import { NgForm } from '@angular/forms';
import { Provider } from 'src/app/models/providerModel';
import { Product } from 'src/app/models/productModel';
import { category } from 'src/app/models/categoryModel';

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
  message: string = '';
  product: Product = {
    id: '',
    provider: '',
    providerName: '',
    category: '',
    name: '',
    description: '',
    price: '',
  };

  constructor(
    private providersService: ProvidersService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getProviders();
    this.getProducts();
    this.getCategories();
  }

  onProviderChange(providerId: string) {
    const selectedProvider = this.providers.find(provider => provider.id === providerId);
    console.log(providerId)
    if (selectedProvider) {
      this.product.provider = selectedProvider.id;
      this.product.providerName = selectedProvider.name;
    }
    console.log(this.product.providerName)
  }


  getProviders() {
    this.providers = this.providersService.getData();
    console.log(this.providers);
  }

  getProducts() {
    this.products = this.productsService.getData();
  }

  setProviderName(id:any){
    this.product.providerName = id.value
  }

  pushProducts(form: NgForm) {
    if (form.valid) {
      if (
        this.isUniqueId(this.product.id) &&
        this.isNumeric(this.product.price)
      ) {
        this.pushProductsToProvider(form.value);
        this.productsService.postData(form.value);
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
      (provider) => product.provider == provider.id
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
    const found = this.products.some((product) => product.id == id);
    return !found;
  }
  isNumeric(price: string) {
    const isNumeric: boolean = /^\d+$/.test(price);
    return isNumeric;
  }
}
