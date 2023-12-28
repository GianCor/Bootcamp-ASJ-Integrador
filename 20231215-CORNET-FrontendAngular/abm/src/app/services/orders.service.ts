import { Injectable } from '@angular/core';
import { Order } from '../models/orderModel'

const data:Order[] = [];

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor() {}
  list = data || [];

  getData() {
    const storedData = localStorage.getItem('orders');
    this.list = storedData ? JSON.parse(storedData) : [];
    return this.list;
  }

  postData(order: Order) {
    this.list.push(order);
    localStorage.setItem('orders', JSON.stringify(this.list))
  }

  updateOrder(object: Order){
    const found = this.list.find((order:Order)=>{
      return order.id === object.id
    })
    if(found){
      const index = this.list.findIndex((order:Order)=>{
        return order === found
      })
      if(index != -1){
        this.list[index] = found;
        localStorage.setItem('orders', JSON.stringify(this.list))
      }
    }
  }
}
