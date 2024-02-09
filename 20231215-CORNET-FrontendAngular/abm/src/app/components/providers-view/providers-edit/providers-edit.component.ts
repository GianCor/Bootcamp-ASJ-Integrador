import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { condicionFrenteAlIva } from 'src/app/models/condicionFrenteIvaModel';
import { Provider } from 'src/app/models/providerModel';
import { GeorefService } from 'src/app/services/georef.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { ActivatedRoute } from '@angular/router';
import { FieldService } from 'src/app/services/field.service';
import { TaxService } from 'src/app/services/tax.service';

@Component({
  selector: 'app-providers-edit',
  templateUrl: './providers-edit.component.html',
  styleUrls: ['./providers-edit.component.css'],
})
export class ProvidersEditComponent {
  providersData: Provider[] = [];
  IVAData: condicionFrenteAlIva[] = [];
  showError: boolean = false;
  showSuccess: boolean = false;
  selectedCuit: any;
  selectedCountryId: any; 
  selectedStateId: any;
  selectedCityId: any;
  selectedField: any;
  selectedTax: any;
  fieldData: any[] = [];

  provider: Provider = {
    id:0,
    supplierCode: '',
    name: '',
    field: {
      id:0,
      name:''
    },
    phone: '',
    tax: {
      id:0,
      name:''
    },
    address: {
      id: 0,
      street: '',
      number: '',
      cp:'',
      city:{
        id:0,
        name:'',
        state:{
          id:0,
          name: '',
          country:{
            id:0,
            name:''
          }
        }
      }
    },
    cuit: '',
    email: '',
    contact:{
      id:0,
      contactName:'',
      contactLastName:'',
      contactEmail:'',
      contactPhone:'',
      contactRole:''
    },
    website: ''
  };
  aux: any;

  message = 'Todos los campos marcados con * son obligatorios';

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  geoLocationModel = {
    id:0,
    name:'',
    state:{
      id:0,
      name: '',
      country:{
        id:0,
        name:''
      }
    }
  }
  constructor(
    private providersService: ProvidersService,
    private georef: GeorefService,
    private taxService: TaxService,
    private fieldService: FieldService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProvidersData();
    this.route.params.subscribe((params) => {
      const providerId = params['id'];
      this.providersService.getProviderById(providerId).subscribe(response => {
        this.provider = response;
        this.selectedCuit = this.provider.cuit;
        this.fieldService.getFields().subscribe((data)=>{
          this.fieldData = data;
          this.selectedField = this.provider.field.id;
          console.log(this.fieldData)
        })
        this.taxService.getTaxes().subscribe((data) =>{
          this.IVAData = data;
          this.selectedTax = this.provider.tax.id;
          console.log("Data" , this.IVAData)
          console.log("selectedTax" , this.selectedTax)
          console.log("tax" , this.provider.tax)
        });
        this.georef.getCountries().subscribe((data) => {
          this.countries = data;
          this.selectedCountryId = this.provider.address.city.state.country.id;
          this.states = this.buscarEstadosPorPais(this.selectedCountryId);
          this.selectedStateId = this.provider.address.city.state.id;
          this.cities = this.buscarCiudadesPorEstado(this.selectedStateId);
          this.selectedCityId = this.provider.address.city.id;
        });
      });
    });
  }
  
  changeSelectedCountry() {
    this.states = this.buscarEstadosPorPais(this.selectedCountryId);
  }
  
  changeSelectedState() {
    this.cities = this.buscarCiudadesPorEstado(this.selectedStateId);
  }
  
  changeSelectedCity() {
    if (!this.showOtherCityInput) {
      this.geoLocationModel.id = this.selectedCityId;
      this.geoLocationModel.name = this.buscarNombreCiudadPorId(this.selectedCityId);
    } else {
      this.geoLocationModel.id = 0;
      this.geoLocationModel.name = this.selectedCityId;
    }
    this.geoLocationModel.state.id = this.selectedStateId;
    this.geoLocationModel.state.name = this.buscarNombreEstadoPorId(this.selectedStateId);
    this.geoLocationModel.state.country.id = this.selectedCountryId;
    this.geoLocationModel.state.country.name = this.buscarNombrePaisPorId(this.selectedCountryId);
  
    this.provider.address.city = this.geoLocationModel;
  }
  
  buscarEstadosPorPais(countryId: number): any[] {
    const country = this.countries.find(country => country.id === countryId);
    return country ? country.states : [];
  }
  
  buscarCiudadesPorEstado(stateId: number): any[] {
    const state = this.states.find(state => state.id === stateId);
    return state ? state.cities : [];
  }
  
  buscarNombrePaisPorId(countryId: number): string {
    const country = this.countries.find(country => country.id === countryId);
    return country ? country.name : '';
  }
  
  buscarNombreEstadoPorId(stateId: number): string {
    const state = this.states.find(state => state.id === stateId);
    return state ? state.name : '';
  }
  
  buscarNombreCiudadPorId(cityId: number): string {
    const city = this.cities.find(city => city.id === cityId);
    return city ? city.name : '';
  }
  

showOtherCityInput: boolean = false;

toggleOtherCityInput() {
  if (this.showOtherCityInput) {
      this.selectedCityId = null;
  }
}

changeSelectedField(){
  this.provider.field.id = this.selectedField;
}

changeSelectedTax(){
  this.provider.tax.id = this.selectedTax;
}

  getProvidersData() {
    this.providersService.getData().subscribe(response=>{
      this.providersData = response;
    });
    console.log(this.providersData);
  }

  editProvider(form: NgForm) {
    if (form.valid) {
      if (
        this.isValidEmail(this.provider.email) && this.isUniqueAndNumericCUIT(this.provider.cuit)
      ) {
        this.providersService.updateProvider(this.provider).subscribe(response=>{
          console.log(response);
        });
        this.message = 'Proveedor editado exitosamente';
        this.showError = false;
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
          this.message = '';
        }, 3000);
        form.reset();
        this.getProvidersData();
      } else {
        this.message =
          'Error: Puede que estes ingresando un cuit repetido, un email incorrecto o un código de proveedor repetido';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
          this.message = '';
        }, 5000);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  isUniqueId(id: string): any {
    const found = this.providersData.some((provider) => provider.supplierCode == id);
    return !found;
  }
  isValidEmail(email: string): boolean {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  isUniqueAndNumericCUIT(cuit: string): boolean {
    const isNumeric: boolean = /^\d+$/.test(cuit);
    if (!isNumeric) {
      return false;
    }
    if(this.provider.cuit != this.selectedCuit){
      const foundCUIT = this.providersData.some(
        (provider) => provider.cuit === cuit
      );
      return !foundCUIT;
    }
    return true;
  }
  
}
