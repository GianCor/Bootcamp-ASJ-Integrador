import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/providerModel';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css']
})
export class ProvidersListComponent implements OnInit {
  providersData: Provider[] = [];

  constructor(private providersService: ProvidersService) { }

  ngOnInit() {
    this.getProvidersData();
    console.log(this.providersData)
  }

  getProvidersData() {
    this.providersData = this.providersService.getData();
  }
}
