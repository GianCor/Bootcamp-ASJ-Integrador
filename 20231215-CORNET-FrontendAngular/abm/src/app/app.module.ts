import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProvidersAddComponent } from './components/providers-view/providers-add/providers-add.component';
import { ProductsAddComponent } from './components/products-view/products-add/products-add.component';
import { ProductsListComponent } from './components/products-view/products-list/products-list.component';
import { ProvidersListComponent } from './components/providers-view/providers-list/providers-list.component';
import { OrdersListComponent } from './components/orders-view/orders-list/orders-list.component';
import { OrdersAddComponent } from './components/orders-view/orders-add/orders-add.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, ProvidersAddComponent, ProductsAddComponent, ProductsListComponent, ProvidersListComponent, OrdersListComponent, OrdersAddComponent, HomeComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
