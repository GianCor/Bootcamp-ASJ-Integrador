import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProvidersAddComponent } from './components/providers-view/providers-add/providers-add.component';
import { ProductsAddComponent } from './components/products-view/products-add/products-add.component';
import { ProductsListComponent } from './components/products-view/products-list/products-list.component';
import { ProvidersListComponent } from './components/providers-view/providers-list/providers-list.component';
import { OrdersListComponent } from './components/orders-view/orders-list/orders-list.component';
import { OrdersAddComponent } from './components/orders-view/orders-add/orders-add.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProvidersEditComponent } from './components/providers-view/providers-edit/providers-edit.component';
import { ProductsEditComponent } from './components/products-view/products-edit/products-edit.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SortByPricePipe } from './pipes/sort-by-price.pipe';
import { SortByPriceDescPipe } from './pipes/sort-by-price-desc.pipe';
import { SearchByIdPipe } from './pipes/search-by-id.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProvidersAddComponent,
    ProductsAddComponent,
    ProductsListComponent,
    ProvidersListComponent,
    OrdersListComponent,
    OrdersAddComponent,
    HomeComponent,
    NavbarComponent,
    ProvidersEditComponent,
    ProductsEditComponent,
    SortByPipe,
    SearchPipe,
    SortByPricePipe,
    SortByPriceDescPipe,
    SearchByIdPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
