import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { condicionFrenteAlIva } from 'src/app/models/condicionFrenteIvaModel';
import { Provider } from 'src/app/models/providerModel';
import { GeorefService } from 'src/app/services/georef.service';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-providers-add',
  templateUrl: './providers-add.component.html',
  styleUrls: ['./providers-add.component.css'],
})
export class ProvidersAddComponent {
  providersData: Provider[] = [];
  IVAData: condicionFrenteAlIva[] = [];
  showError: boolean = false;
  showSuccess: boolean = false;
  provider: Provider = {
    id: '',
    name: '',
    field: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    iva: '',
    address: '',
    cuit: '',
    cp: '',
    email: '',
    contactName: '',
    contactLastName: '',
    website: '',
  };
  aux: any;

  message = 'Todos los campos marcados con * son obligatorios';

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private providersService: ProvidersService,
    private georef: GeorefService
  ) {}

  ngOnInit() {
    this.getProvidersData();
    this.getIVAData();
    this.georef.getCountries().subscribe((data) => {
      this.countries = data;
      console.log(this.countries)
    });
  }

  changeSelectedCountry() {
    const index = this.countries.findIndex(
      (country) => country.name === this.provider.country
    )
    this.states = this.countries[index].states
  }

  changeSelectedState() {
    const countryIndex = this.countries.findIndex(
      (country) => country.name === this.provider.country
    )
    const stateIndex = this.states.findIndex(state => state.name === this.provider.state);
    this.cities = this.countries[countryIndex].states[stateIndex].cities
  }

  getProvidersData() {
    this.providersData = this.providersService.getData();
    console.log(this.providersData);
  }

  getIVAData() {
    this.IVAData = this.providersService.getIVA();
  }

  pushProvidersData(form: NgForm) {
    if (form.valid) {
      if (this.isUniqueId(this.provider.id) && this.isUniqueAndNumericCUIT(this.provider.cuit) && this.isValidEmail(this.provider.email)) {
        this.providersService.postData(form.value);
        this.message = 'Proveedor agregado exitosamente';
        this.showError = false;
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
          this.message = '';
        }, 3000);
        form.reset();
        this.getProvidersData();
      } else {
        this.message = 'Código de proveedor y Cuit deben ser únicos. Cuit debe ser numérico. El email debe ser válido'
        this.showError = true
        setTimeout(() => {
          this.showError = false;
          this.message = '';
        }, 3000);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  isUniqueId(id: string): any {
    const found = this.providersData.some((provider) => provider.id == id);
    return !found;
  }
  isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  isUniqueAndNumericCUIT(cuit: string): boolean {
    const isNumeric: boolean = /^\d+$/.test(cuit);
    if (!isNumeric) {
      return false;
    }
    const foundCUIT = this.providersData.some((provider) => provider.cuit === cuit);
    return !foundCUIT;
  }
}
