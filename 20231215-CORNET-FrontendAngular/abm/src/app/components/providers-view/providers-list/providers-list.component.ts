import { Component, OnInit } from '@angular/core';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css']
})
export class ProvidersListComponent implements OnInit {
  providersData: any[] = [];

  constructor(private providersService: ProvidersService) { }

  ngOnInit() {
    this.getProvidersData();
    console.log(this.providersData)
  }

  getProvidersData() {
    this.providersData = this.providersService.getData();
  }
}
