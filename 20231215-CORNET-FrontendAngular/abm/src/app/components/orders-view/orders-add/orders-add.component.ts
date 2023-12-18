import { Component } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { ProductsService } from '../../../services/products.service';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.css']
})
export class OrdersAddComponent {
  providers: any[] = [];
  products: any[] = [];
  orders: any[] = [];
  order = {
    id: '',
    product: '',
    provider: '',
    amount: '',
    emDate: '',
    reDate: '',
    address: '',
    total:'',
  };
  constructor(
    private providersService: ProvidersService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.getProviders();
    this.getProducts();
    this.getOrders();
  }

  getProviders() {
    this.providers = this.providersService.getData();
  }

  getProducts() {
    this.products = this.productsService.getData();
  }

  getOrders() {
    this.orders = this.ordersService.getData();
  }

  postOrders(){
    this.ordersService.postData(this.order)
  }
  clearForm(){
    this.order = {
      id: '',
      product: '',
      provider: '',
      amount: '',
      emDate: '',
      reDate: '',
      address: '',
      total:'',
    };
  }
}
