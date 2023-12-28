import { Injectable } from '@angular/core';
import { category } from '../models/categoryModel';
import { categories } from '../data/categories';
import { ProvidersService } from './providers.service';
import { BridgeService } from './bridge.service';

const categoriesList: category[] = categories;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private providersService: ProvidersService,
    private bridgeService: BridgeService
  ) {
    this.bridgeService.providerDeleted$.subscribe((deletedProviderId) => {
      this.deleteProductsByProvider(deletedProviderId);
    });
  }

  data: any = [];
  providers: any = [];
  categoriesList = categoriesList;

  getData() {
    const storedData = localStorage.getItem('products');
    this.data = storedData ? JSON.parse(storedData) : [];
    return this.data;
  }

  postData(data: any) {
    if (Array.isArray(data)) {
      this.data = data;
    } else {
      this.data = this.getData();
      this.data.push(data);
    }
    localStorage.setItem('products', JSON.stringify(this.data));
  }

  getCategories() {
    return this.categoriesList;
  }

  deleteProducts(product: any) {
    const productIndex = this.data.findIndex((p: any) => p === product);
    if (productIndex != -1) {
      this.data.splice(productIndex, 1);
      this.postData(this.data);
    }
    this.providersService.deleteProductFromProvider(
      product.id,
      product.provider
    );
  }

  deleteProductsByProvider(providerId: string) {
    const productsToDelete = this.data.filter(
      (product: any) => product.provider === providerId
    );
    productsToDelete.forEach((product: any) => {
      const productIndex = this.data.findIndex((p: any) => p.id === product.id);
      if (productIndex !== -1) {
        this.data.splice(productIndex, 1);
      }
    });
    this.postData(this.data);
  }

  getProductById(id: string) {
    const storedData = localStorage.getItem('products');
    this.data = storedData ? JSON.parse(storedData) : [];
    const foundProduct = this.data.find((product: any) => product.id === id);
    return foundProduct;
  }

  updateProduct(updatedProduct: any) {
    const storedData = localStorage.getItem('products');
    this.data = storedData ? JSON.parse(storedData) : [];
    console.log(this.data);
    const index = this.data.findIndex(
      (product: any) => product.id === updatedProduct.id
    );
    console.log(index);
    if (index !== -1) {
      this.data[index] = updatedProduct;
      console.log(this.data);
      localStorage.setItem('products', JSON.stringify(this.data));
    }
  }

  updateProductAndProvider(updatedProduct: any) {
    this.updateProduct(updatedProduct);

    const providers = this.providersService.getData();
    providers.forEach((provider: any) => {
      const productIndex = provider.products.findIndex(
        (p: any) => p.id === updatedProduct.id
      );
      if (productIndex !== -1) {
        provider.products[productIndex] = { ...updatedProduct };
        this.providersService.updateProvider(provider);
      }
    });
  }
}
