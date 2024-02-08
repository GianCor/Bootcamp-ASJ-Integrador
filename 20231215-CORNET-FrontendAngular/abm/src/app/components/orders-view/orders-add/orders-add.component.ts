import { Component } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { OrdersService } from '../../../services/orders.service';
import { Order, OrderProduct } from 'src/app/models/orderModel';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

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
    emDate: new Date(),
    reDate: new Date(),
    description: '',
    pending: true,
    canceled: false,
    completed: false,
    total: undefined,
    created_at: undefined,
    updated_at: undefined,
    orderProducts: []
};

orderProducts: OrderProduct = {
  id:0,
  product:{
    id: 0,
    sku: '',
    supplier_id: 0,
    supplierName: '',
    category: {
      id:0,
      name: ''
        },
    name: '',
    description: '',
    price: ''
  },
  amount: 0,
  price: 0,
  subtotal: 0
}

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
    this.getOrders();
    this.getProviders();
  }

  getProviders() {
    this.providersService.getActiveProviders().subscribe(response =>{
      this.providers = response;
    });
  }

  onProviderChange() {
    this.providersService.getProviderById(this.selectedProvider).subscribe(response =>{
      if (response.products !== undefined) {
        this.selectedProviderProducts = response.products;
        this.order.provider = response.name;
        console.log(`ACA ESTARIA EL ERROR MIRAAAAAAAAAAAA: ${this.selectedProviderProducts} `)
      } else {
        this.selectedProviderProducts = []; 
        this.order.provider = response.name;
      }
    })
  }

  getOrders() {
    this.ordersService.getData().subscribe(response => {
      this.orders = response;
      console.log(this.orders)
    });
  }

  postOrder(order: Order, form: NgForm) {
    console.log(order);
    this.addProductToOrders();
    if(!this.validateDates()){
      this.showError = true;
      this.message = 'No se han seleccionado fechas o la fecha de emisión es posterior a la de entrega'
      setTimeout(()=>{
        this.showError=false
      },2500)
    } else {

      if(this.order.orderProducts.length == 0){
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
          this.ordersService.postData(order).subscribe((response) => {
            console.log(response);
            this.resetProducts();
            this.getProviders();
          });
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

  resetProducts() {
    this.selectedProviderProducts.forEach((product) => {
      product.checked = false;
      product.amount = undefined;
    });
  }

  validateDates() {
    return (new Date(this.order.reDate) >= new Date(this.order.emDate));
  }

  addProductToOrders() {
    const productsOrder = this.getCheckedProducts();
    this.order.orderProducts = productsOrder.map((product) => ({
      id: 0, 
      product: {
        id: product.id,
        sku: product.sku,
        supplier_id: product.supplier_id,
        supplierName: product.supplierName,
        category: {
          id: product.category.id,
          name: product.category.name,
        },
        name: product.name,
        description: product.description,
        price: product.price,
      },
      amount: product.amount,
      price: product.price,
      subtotal: product.amount * +product.price,
    }));
    this.order.total = this.calculateTotal(productsOrder);
  }

  showTotal:number = 0;

  getCheckedProducts() {
    const checkedProducts = this.selectedProviderProducts.filter(
      (product) => product.checked === true && product.amount !== undefined
    );
    this.showTotal = this.calculateTotal(checkedProducts);
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
