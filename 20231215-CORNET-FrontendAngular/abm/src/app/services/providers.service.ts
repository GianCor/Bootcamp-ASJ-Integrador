import { Injectable } from '@angular/core';
import { providers } from '../data/providers';

let data = providers;

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  constructor() {}
  getData(){
    return data;
  }
  postData(arr:[]){
    data = arr
  }
}
