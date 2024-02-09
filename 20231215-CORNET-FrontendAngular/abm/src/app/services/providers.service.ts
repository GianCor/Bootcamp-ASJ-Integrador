import { Injectable } from '@angular/core';
import { BridgeService } from './bridge.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../models/providerModel';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  private apiUrl = 'http://localhost:8080/supplier';
  constructor(private http: HttpClient, private bridgeService: BridgeService, private productService: ProductsService) {}
  data: any = [];
  getData():Observable<any>{
    this.data = this.http.get<any[]>(this.apiUrl);
    return this.data;
  }

  getActiveProviders():Observable<any>{
    this.data = this.http.get<any[]>(this.apiUrl+"/active");
    return this.data;
  }

  getProviderById(id: string):Observable<Provider> {
    const foundProvider = this.http.get<Provider>(this.apiUrl + `/${id}`)
    return foundProvider;
  }

  updateProvider(updatedProvider: Provider): Observable<Provider> {
    return this.http.put<Provider>(`${this.apiUrl}/${updatedProvider.id}`, updatedProvider);
  }

  postData(provider: Provider) {
    return this.http.post<Provider>(this.apiUrl, provider);
  }

  logicallyDeleteProvider(updatedProvider: Provider): Observable<Provider> {
    if(updatedProvider.products){
      updatedProvider.products.forEach(product =>{
        product.deleted = true;
        this.productService.updateProduct(product).subscribe();
      })
    }
    return this.http.put<Provider>(`${this.apiUrl}/${updatedProvider.id}`, updatedProvider);
  }

  logicallyRetrieveProvider(updatedProvider: Provider): Observable<Provider> {
    if(updatedProvider.products){
      updatedProvider.products.forEach(product =>{
        product.deleted = false;
        this.productService.updateProduct(product).subscribe();
      })
    }
    return this.http.put<Provider>(`${this.apiUrl}/${updatedProvider.id}`, updatedProvider);
  }

  deleteProvider(provider: Provider): Observable<Provider>{
    return this.http.delete<Provider>(`${this.apiUrl}/${provider.id}`)
  }

  deleteProductFromProvider(idProduct: string, idProvider: string){

  }
}