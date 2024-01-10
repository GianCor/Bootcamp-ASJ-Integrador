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
}
