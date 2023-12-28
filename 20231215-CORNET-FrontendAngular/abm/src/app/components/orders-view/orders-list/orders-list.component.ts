import { Component, ViewChild, ElementRef } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { Order } from 'src/app/models/orderModel';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent {
  message: string = ''
  showMessage: string = 'canceladas'
  show:boolean = true

  search = ''
  showCanceled: boolean = false
  showCompleted: boolean = false

  ordersData: Order[] = [];
  selectedOrder: any={}

  constructor(
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.getOrders();
    if(this.ordersData.length === 0){
      this.show = !this.show
    }
  }

  getOrders() {
    this.ordersData = this.ordersService.getData();
  }

  setSelectedOrder(order:any){
    this.selectedOrder = order
    console.log(this.selectedOrder)
    if(this.selectedOrder.pending){
      this.message = 'Pendiente'
    } else {
      this.message = 'Cancelada'
    }
  }

  updateOrder(order: Order){
    this.ordersService.updateOrder(order)
  }
}
