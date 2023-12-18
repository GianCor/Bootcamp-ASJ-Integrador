import { Component } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { ProductsService } from '../../../services/products.service';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent {
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
    adress: '',
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
}
