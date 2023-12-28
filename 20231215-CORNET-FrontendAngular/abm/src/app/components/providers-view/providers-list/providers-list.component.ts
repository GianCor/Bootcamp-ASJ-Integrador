import { Component, OnInit } from '@angular/core';
import { ProvidersService } from 'src/app/services/providers.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css']
})
export class ProvidersListComponent implements OnInit {
  providersData: any[] = [];
  selectedProvider :any = {}
  providerIndex! : any
  show:boolean = true;

  sortByPrice:boolean = false;
  sortByPriceDesc:boolean = false;
  search:string = ""

  constructor(private providersService: ProvidersService, private router: Router) { }

  ngOnInit() {
    this.getProvidersData();
    if(this.providersData.length === 0){
      this.show = !this.show
    }
  }

  getProvidersData() {
    this.providersData = this.providersService.getData();
  }

  deleteProvider(provider:any){
    this.providersService.deleteProvider(provider)
  }
  editProvider(provider:any){
    this.router.navigate(['/providers/edit', provider.id]);
  }

  setSelectedProvider(provider: any){
    this.selectedProvider = provider
  }
}
