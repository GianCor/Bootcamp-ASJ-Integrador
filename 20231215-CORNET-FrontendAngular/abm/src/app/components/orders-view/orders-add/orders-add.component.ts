import { Component } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { ProductsService } from '../../../services/products.service';
import { OrdersService } from '../../../services/orders.service';
import { Order } from 'src/app/models/orderModel';
import { Provider } from 'src/app/models/providerModel';
import { Product } from 'src/app/models/productModel';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.css']
})
export class OrdersAddComponent {
  providers: Provider[] = [];
  products: Product[] = [];
  orders: Order[] = [];
  order: Order = { // Inicializar el objeto 'order'
    id: 0, // Puedes inicializar con valores vacíos o nulos según corresponda
    provider: '',
    product: '',
    amount: 0,
    emDate: new Date,
    reDate: new Date,
    address: '',
    total: 0
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
}
