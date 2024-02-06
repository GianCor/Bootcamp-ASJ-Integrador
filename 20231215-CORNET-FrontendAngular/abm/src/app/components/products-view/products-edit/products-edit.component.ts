import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { ProductsService } from '../../../services/products.service';
import { NgForm } from '@angular/forms';
import { Provider } from 'src/app/models/providerModel';
import { Category, Product } from 'src/app/models/productModel';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent {
  providers: Provider[] = [];
  products: Product[] = [];
  categories: Category[] = [];
  showError: boolean = false;
  selectedCategory = null;
  showSuccess: boolean = false;
  message: string = '';
  product: Product = {
    id:0,
    sku: '',
    supplier_id: 0,
    supplierName: '',
    category: {
      id:0,
      name: ''
    },
    name: '',
    description: '',
    price: '',
  };

  constructor(
    private providersService: ProvidersService,
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.productsService.getProductById(productId).subscribe(response => {
        this.product = response
        console.log(this.product)
      });
    });
    this.getProviders();
    this.getProducts();
    this.getCategories();
  }

  getProviders() {
    this.providersService.getData().subscribe(response=>{
      this.providers = response;
    });
  }


  onCategoryChange(category: any){
    this.product.category = category.value;
  }


  getProducts() {
    this.productsService.getData().subscribe(response => this.products = response);
  }

  pushProducts(form: NgForm) {
    if (form.valid) {
        this.productsService.updateProduct(this.product).subscribe(response => console.log(response));
        this.message = 'Proveedor agregado exitosamente';
        this.showError = false;
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
          this.message = '';
        }, 3000);
        form.reset();
      } else {
        this.message =
          'Código de producto debe ser único, precio debe ser numérico';
        this.showSuccess = false;
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
          this.message = '';
        }, 3000);
      }
    }

  pushProductsToProvider(product: Product) {
    const index = this.providers.findIndex(
      (provider) => product.supplier_id == provider.id
    );
    if (index != -1) {
      if (this.providers[index].products == undefined) {
        this.providers[index].products = [product];
      } else {
        this.providers[index].products?.push(product);
      }
      this.providersService.updateProvider(this.providers[index]);
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => this.categories = response);
  }

  isUniqueId(id: string): any {
    this.getProducts();
    const found = this.products.some((product) => product.sku == id);
    return !found;
  }
  isNumeric(price: string) {
    const isNumeric: boolean = /^\d+$/.test(price);
    return isNumeric;
  }
}
