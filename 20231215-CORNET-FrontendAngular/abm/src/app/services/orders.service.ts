import { Injectable } from '@angular/core';
import { orders } from '../data/orders';
import { Order } from '../models/orderModel'

const data:Order[] = orders;

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor() {}
  lista = data || [];

  getData() {
    //ACORDATE DE HACER EL GET DEL LOCALSTORAGE AAAA
    return this.lista;
  }

  postData(object: Order) {
    this.lista.push(object);
    localStorage.setItem('orders', JSON.stringify(this.lista))
  }
}
