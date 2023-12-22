import { Component} from '@angular/core';
import { Provider } from 'src/app/models/providerModel';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-providers-add',
  templateUrl: './providers-add.component.html',
  styleUrls: ['./providers-add.component.css'],
})
export class ProvidersAddComponent {
  providersData: any[] = [];
  showError = false; 
  provider: Provider = {
    id: 0,
    name: '',
    field: '',
    phone: 0,
    state: '',
    city: '',
    iva: '',
    address: '',
    cuit: 0,
    email: '',
    contactName: '', // Nombre del contacto
    contactLastName: '', // Apellido del contacto
    website: '' // Sitio web
};


  constructor(private providersService: ProvidersService) {}

  ngOnInit() {
    this.getProvidersData();
  }

  getProvidersData() {
    this.providersData = this.providersService.getData();
  }

  pushProvidersData() {
    if (
      this.isNumeric(this.provider.id) &&
      this.isUniqueID(+this.provider.id) &&
      this.isNumeric(this.provider.cuit) &&
      this.isUniqueCUIT(this.provider.cuit) &&
      this.isNumeric(this.provider.phone)
    ) {
      this.providersData.push(this.provider);
      this.showError = false;
    } else {
      console.log('La validación de los campos ha fallado.');
      this.showError = true;
    }
  }

  isNumeric(value: any): boolean {
    return /^\d+$/.test(value);
  }

  isUniqueID(id: number): boolean {
    const found = this.providersData.some(provider => provider.id === id);
    return !found;
  }

  isUniqueCUIT(cuit: number): boolean {
    const found = this.providersData.some(provider => provider.cuit === cuit);
    return !found;
  }
}
