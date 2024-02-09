import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  activeSection: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveSection();
    });
  }

  setActiveSection() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('providers')) {
      this.activeSection = 'providers';
    } else if (currentUrl.includes('products')) {
      this.activeSection = 'products';
    } else if (currentUrl.includes('orders')) {
      this.activeSection = 'orders';
    } else {
      this.activeSection = ''; // Colapsar todos los elementos del acordeón
    }
  }
  laRuta(word:string):boolean{
    return this.router.routerState.snapshot.url.includes(word);
  }
}

  

