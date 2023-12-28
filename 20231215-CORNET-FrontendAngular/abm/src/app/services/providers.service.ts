import { Injectable } from '@angular/core';
import { condicionFrenteAlIva } from '../models/condicionFrenteIvaModel';
import { condicionFrenteAlIvaData } from '../data/condicionFrenteIva';
import { BridgeService } from './bridge.service';
const dataIva: condicionFrenteAlIva[] = condicionFrenteAlIvaData;

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  constructor(private bridgeService: BridgeService) {}
  data: any = [];
  dataIva = dataIva;
  getData() {
    const storedData = localStorage.getItem('providers');
    this.data = storedData ? JSON.parse(storedData) : [];
    return this.data;
  }

  getIVA() {
    return this.dataIva;
  }

  getProviderById(id: string) {
    const storedData = localStorage.getItem('providers');
    this.data = storedData ? JSON.parse(storedData) : [];

    const foundProvider = this.data.find((provider: any) => provider.id === id);
    return foundProvider;
  }

  updateProvider(updatedProvider: any) {
    const storedData = localStorage.getItem('providers');
    this.data = storedData ? JSON.parse(storedData) : [];
    console.log(updatedProvider)

    const index = this.data.findIndex((provider: any) => provider.id === updatedProvider.id);
    if (index !== -1) {
      this.data[index] = updatedProvider;
      localStorage.setItem('providers', JSON.stringify(this.data));
    }
  }

  postData(arr: any) {
    if (Array.isArray(arr)) {
      this.data = arr;
    } else {
      this.data = this.getData();
      this.data.push(arr);
    }
    localStorage.setItem('providers', JSON.stringify(this.data));
  }

  deleteProvider(provider: any) {
    const providerIndex = this.data.findIndex((p: any) => p.id === provider.id);
    if (providerIndex !== -1) {
      const deletedProvider = this.data.splice(providerIndex, 1)[0];
      this.postData(this.data);
      this.bridgeService.emitProviderDeleted(deletedProvider.id);
    }
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