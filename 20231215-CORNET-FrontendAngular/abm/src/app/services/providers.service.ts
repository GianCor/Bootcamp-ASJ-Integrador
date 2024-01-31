import { Injectable } from '@angular/core';
import { BridgeService } from './bridge.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../models/providerModel';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  private apiUrl = 'http://localhost:8080/supplier';
  constructor(private http: HttpClient, private bridgeService: BridgeService) {}
  data: any = [];
  getData():Observable<any>{
    this.data = this.http.get<any[]>(this.apiUrl);
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

  deleteProvider(provider: Provider): Observable<Provider>{
    return this.http.delete<Provider>(`${this.apiUrl}/${provider.id}`)
  }

  deleteProductFromProvider(idProduct: string, idProvider: string){
    const providerIndex = this.data.findIndex((p:any) => p.id === idProvider);
    if(providerIndex != -1){
      const productIndex = this.data[providerIndex].products.findIndex((p:any)=>p.id === idProduct)
      if(productIndex != -1){
        this.data[providerIndex].products.splice(productIndex, 1);
        this.postData(this.data)
      }
    }
  }
}