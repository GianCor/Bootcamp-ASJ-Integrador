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
  }

  getProvidersData() {
    this.providersService.getData().subscribe((response:any)=>{
      this.providersData = response;
      console.log(this.providersData)
      if(this.providersData.length === 0){
        this.show = !this.show
      }
      this.selectedProvider = this.providersData[0];
    });
  }

  deleteProvider(provider:any){
    this.providersService.deleteProvider(provider).subscribe((response)=>{
      console.log(response)
      this.getProvidersData();
    });
  }
  editProvider(provider:any){
    this.router.navigate(['/providers/edit', provider.id]);
  }

  updateProvider(provider:any){
    this.providersService.updateProvider(provider).subscribe((response) => console.log(response))
  }

  setSelectedProvider(provider: any){
    this.selectedProvider = provider
    console.log(this.selectedProvider)
  }
}
