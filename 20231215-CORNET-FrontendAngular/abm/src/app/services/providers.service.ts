import { Injectable} from '@angular/core';
import { providers } from '../data/providers';
import { Provider } from '../models/providerModel';

let data:Provider[] = providers;

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  constructor() {}
  getData(){
    return data;
  }
  postData(arr:Provider[]){
    data = arr
  }
}
