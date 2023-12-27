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
  providers: any[] = [];
  selectedProvider: any;
  selectedProducts: any[]=[];
  selectedProviderProducts: any[] = [];
  orders: Order[] = [];
  order: Order = { 
    id: '',
    provider: '',
    product: [],
    amount: '',
    emDate: new Date,
    reDate: new Date,
    address: '',
    total: ''
  };
  constructor(
    private providersService: ProvidersService,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.getProviders();

    this.getOrders();
  }

  getProviders() {
    this.providers = this.providersService.getData();
  }

  onProviderChange() {
    const selected = this.providers.find(provider => provider.id === this.selectedProvider);
    if (selected) {
      this.selectedProviderProducts = selected.products;
    } else {
      this.selectedProviderProducts = [];
    }
  }

  getOrders() {
    this.orders = this.ordersService.getData();
  }

  postOrders(){

  }

  addProductToOrders(){
    this.order.product = this.selectedProviderProducts
  }

  calculateTotal(products: any[]){
    let total = 0;
    for(let i = 0; i<products.length; i++){
      total += products[i].amount * products[i].price
    }
  }

  postAmountOfProducts(){
    console.log("llamando a la segunda funcion")
  }
}
