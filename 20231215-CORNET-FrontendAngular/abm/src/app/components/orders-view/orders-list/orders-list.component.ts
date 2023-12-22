import { Component } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { Order } from 'src/app/models/orderModel';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent {
  ordersData: Order[] = [];

  constructor(
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.ordersData = this.ordersService.getData();
  }
}
