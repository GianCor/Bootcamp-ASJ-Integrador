import { Injectable } from '@angular/core';
import { Order } from '../models/orderModel'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const data:Order[] = [];

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}
  list = data || [];

  url: string = "http://localhost:8080/order"

  getData():Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }

  postData(order: Order):Observable<Order>{
    return this.http.post<Order>(this.url, order);
  }

  updateOrder(order: Order){
    return this.http.put<Order>(this.url + `/${order.id}`, order)
  }
}
