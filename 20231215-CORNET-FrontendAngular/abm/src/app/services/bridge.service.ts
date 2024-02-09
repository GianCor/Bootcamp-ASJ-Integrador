import { Injectable } from '@angular/core';
import { ProvidersService } from './providers.service';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Stats } from '../models/statsModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {

  constructor(private http: HttpClient) { }

  url='http://localhost:8080/bridge'

  getStats():Observable<Stats>{
    return this.http.get<Stats>(this.url)
  }

}
