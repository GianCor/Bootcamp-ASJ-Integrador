import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BridgeService {

  constructor() { }

  private providerDeletedSubject = new Subject<string>();
  providerDeleted$ = this.providerDeletedSubject.asObservable();

  emitProviderDeleted(providerId: string) {
    this.providerDeletedSubject.next(providerId);
  }

  private productUpdatedSubject = new Subject<string>()
  productUpdated$ = this.productUpdatedSubject.asObservable()

  emitProductUpdated(productId: string){
    this.productUpdatedSubject.next(productId)
  }
}
