import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersAddComponent } from './components/providers-view/providers-add/providers-add.component';
import { ProductsListComponent } from './components/products-view/products-list/products-list.component';
import { ProductsAddComponent } from './components/products-view/products-add/products-add.component';
import { OrdersListComponent } from './components/orders-view/orders-list/orders-list.component';
import { OrdersAddComponent } from './components/orders-view/orders-add/orders-add.component';
import { ProvidersListComponent } from './components/providers-view/providers-list/providers-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'providers-add', component: ProvidersAddComponent },
  { path: 'providers-list', component: ProvidersListComponent },
  { path: 'products-add', component: ProductsAddComponent },
  { path: 'products-list', component: ProductsListComponent },
  { path: 'orders-list', component: OrdersListComponent },
  { path: 'orders-add', component: OrdersAddComponent },
  { path: '**', component: HomeComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
