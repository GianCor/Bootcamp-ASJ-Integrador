import { Injectable } from '@angular/core';
import { condicionFrenteAlIva } from '../models/condicionFrenteIvaModel';
import { condicionFrenteAlIvaData } from '../data/condicionFrenteIva';
const dataIva: condicionFrenteAlIva[] = condicionFrenteAlIvaData;

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  constructor() {}
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
      console.log(this.data);
    }
    localStorage.setItem('providers', JSON.stringify(this.data));
  }
}
