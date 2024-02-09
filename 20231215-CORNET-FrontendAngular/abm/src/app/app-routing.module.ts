import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersAddComponent } from './components/providers-view/providers-add/providers-add.component';
import { ProductsListComponent } from './components/products-view/products-list/products-list.component';
import { ProductsAddComponent } from './components/products-view/products-add/products-add.component';
import { OrdersListComponent } from './components/orders-view/orders-list/orders-list.component';
import { OrdersAddComponent } from './components/orders-view/orders-add/orders-add.component';
import { ProvidersListComponent } from './components/providers-view/providers-list/providers-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProvidersEditComponent } from './components/providers-view/providers-edit/providers-edit.component';
import { ProductsEditComponent } from './components/products-view/products-edit/products-edit.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  {
    path: 'providers',
    children: [
      { path: 'add', component: ProvidersAddComponent },
      { path: 'list', component: ProvidersListComponent },
      { path: 'edit/:id', component: ProvidersEditComponent},
      { path: '**', component: HomeComponent },
    ],
  },
  {
    path: 'products',
    children: [
      { path: 'add', component: ProductsAddComponent },
      { path: 'list', component: ProductsListComponent },
      { path: 'edit/:id', component: ProductsEditComponent},
      { path: '**', component: HomeComponent },
    ],
  },
  {
    path: 'orders',
    children: [
      { path: 'list', component: OrdersListComponent },
      { path: 'add', component: OrdersAddComponent },
      { path: '**', component: HomeComponent },
    ],
  },
  {
    path: 'stats', component: StatsComponent
  },
  { path: '**', component: HomeComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
