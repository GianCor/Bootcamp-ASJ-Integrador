import { Injectable } from '@angular/core';
import { orders } from '../data/orders';

const data = orders;

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor() {}
  lista = data || [];
  getData() {
    return this.lista;
  }

  postData(object: any) {
    this.lista.push(object);
  }
}
