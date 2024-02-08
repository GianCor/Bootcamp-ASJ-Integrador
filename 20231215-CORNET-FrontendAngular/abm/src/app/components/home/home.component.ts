import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showProviders:boolean=false
  showProducts:boolean=false
  showOrders:boolean=false

  showComponents(show:number){
    switch(show){
      case 1: this.showProviders=true; this.showProducts = false; this.showOrders = false;
      break
      case 2:  this.showProviders=false; this.showProducts = true; this.showOrders = false;
      break
      case 3:  this.showProviders=false; this.showProducts = false; this.showOrders = true;
      break
      default: this.showProviders=false; this.showProducts = false; this.showOrders = false;
    }
  }
}
