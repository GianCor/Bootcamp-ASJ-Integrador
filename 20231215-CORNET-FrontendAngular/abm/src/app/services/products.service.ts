import { Injectable } from '@angular/core';
import { category } from '../models/categoryModel';
import { categories } from '../data/categories';
import { ProvidersService } from './providers.service';
import { BridgeService } from './bridge.service';

const categoriesList:category[] = categories

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private providersService: ProvidersService, private bridgeService: BridgeService) {
    this.bridgeService.providerDeleted$.subscribe((deletedProviderId) => {
      this.deleteProductsByProvider(deletedProviderId);
    });
  }

  data:any = []
  providers: any = []
  categoriesList = categoriesList

  getData() {
    const storedData = localStorage.getItem('products');
    this.data = storedData ? JSON.parse(storedData) : [];
    return this.data
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
  
  getCategories(){
    return this.categoriesList
  }

  deleteProducts(product: any){
    const productIndex = this.data.findIndex((p:any)=>p === product)
    if(productIndex!=-1){
      this.data.splice(productIndex, 1);
      this.postData(this.data)
    }
    this.providersService.deleteProductFromProvider(product.id, product.provider)
  }

  deleteProductsByProvider(providerId: string) {
    const productsToDelete = this.data.filter((product: any) => product.provider === providerId);
    productsToDelete.forEach((product: any) => {
      const productIndex = this.data.findIndex((p: any) => p.id === product.id);
      if (productIndex !== -1) {
        this.data.splice(productIndex, 1);
      }
    });
    this.postData(this.data);
  }

  getProductById(id:string){
    const storedData = localStorage.getItem('products');
    this.data = storedData ? JSON.parse(storedData) : [];
    const foundProvider = this.data.find((product: any) => product.id === id);
    return foundProvider;
  }

  updateProduct(updatedProduct: any) {
    const storedData = localStorage.getItem('product');
    this.data = storedData ? JSON.parse(storedData) : [];

    const index = this.data.findIndex((product: any) => product.id === updatedProduct.id);
    if (index !== -1) {
      console.log(`index: ${index}`)
      this.data[index] = updatedProduct;
      localStorage.setItem('providers', JSON.stringify(this.data));
    }
  }

}