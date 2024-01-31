import { Component } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { OrdersService } from '../../../services/orders.service';
import { Order } from 'src/app/models/orderModel';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.css'],
})
export class OrdersAddComponent {
  search: string = ''
  providers: any[] = [];
  selectedProvider: any;
  selectedProviderProducts: any[] = [];
  selectedProducts: any[] = [];
  orders: Order[] = [];
  order: Order = {
    id: 0,
    numOrder: '',
    provider: '',
    product: [],
    emDate: new Date(),
    reDate: new Date(),
    description: '',
    pending: true,
    canceled: false,
    completed: false
  };
  message: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;

  sortByPrice: boolean = false;
  sortByName: boolean = false;

  constructor(
    private providersService: ProvidersService,
    private ordersService: OrdersService
  ) {}

  
  ngOnInit() {
    this.getProviders();
    this.getOrders();
  }

  getProviders() {
    this.providersService.getData().subscribe(response =>{
      this.providers = response;
    });
  }

  onProviderChange() {
    const selected = this.providers.find(
      (provider) => provider.id === this.selectedProvider
    );
    console.log(selected)
    this.order.provider = selected.name;
    if (selected) {
      this.selectedProviderProducts = selected.products;
    } else {
      this.selectedProviderProducts = [];
    }
  }

  getOrders() {
    this.orders = this.ordersService.getData();
  }

  postOrder(order: Order, form: NgForm) {
    this.addProductToOrders();
    if(!this.validateDates()){
      this.showError = true;
      this.message = 'No se han seleccionado fechas o la fecha de emisión es posterior a la de entrega'
      setTimeout(()=>{
        this.showError=false
      },2500)
    } else {

      if(this.order.product.length == 0){
        this.showError=true
        this.message = 'No hay productos seleccionados o estan vacíos'
        setTimeout(()=>{
          this.showError=false
        },2500)

      } else if (form.valid) {
        if(!this.isUniqueId(order.numOrder)){
          this.message = 'El número de orden ya existe'
          this.showError = true;
          setTimeout(()=>{
            this.showError=false
          },2500)
        }else{
          this.ordersService.postData(order);
          form.reset()
          this.showSuccess= true
          this.message = 'Orden añadida exitosamente'
          setTimeout(()=>{
            this.showSuccess=false
          },2500)
        }
      }
    }
  }

  

  validateDates() {
    return (new Date(this.order.reDate) >= new Date(this.order.emDate));
  }

  addProductToOrders() {
    const productsOrder = this.getCheckedProducts();
    this.order.product = productsOrder;
    this.order.total = this.calculateTotal(productsOrder);
  }

  getCheckedProducts() {
    const checkedProducts = this.selectedProviderProducts.filter(
      (product) => product.checked === true && product.amount !== undefined
    );
    return checkedProducts;
  }

  calculateTotal(products: any[]) {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].amount * +products[i].price;
      products[i].subtotal = products[i].amount * +products[i].price;
    }
    return total;
  }

  isUniqueId(id: string): any {
    const found = this.orders.some((order) => order.numOrder == id);
    return !found;
  }
}
