import { Component, ViewChild, ElementRef, Input } from '@angular/core';
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
  @Input() showTitle: boolean = true;


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
  }
  getOrders() {
    this.ordersService.getData().subscribe(response => {
      this.ordersData = response;
      if(this.ordersData.length === 0){
        this.show = false;
      }
    });
  }

  setSelectedOrder(order:any){
    this.selectedOrder = order
    console.log(this.selectedOrder)
    if(this.selectedOrder.pending == true && this.selectedOrder.canceled == false){
      this.message = 'Pendiente'
    } else if(this.selectedOrder.canceled) {
      this.message = 'Cancelada'
    } else {
      this.message = 'Completada'
    }
  }

  updateOrder(order: Order){
    this.ordersService.updateOrder(order).subscribe(response => console.log(response));
  }
  showOrders(type: string) {
    switch (type) {
      case 'pendientes':
        this.showCanceled = false;
        this.showCompleted = false;
        this.showMessage = 'pendientes';
        break;
      case 'completadas':
        this.showCanceled = false;
        this.showCompleted = true;
        this.showMessage = 'completadas';
        break;
      case 'canceladas':
        this.showCanceled = true;
        this.showCompleted = false;
        this.showMessage = 'canceladas';
        break;
      default:
        // Default case, maybe handle it differently based on your requirements
    }
  }
}
