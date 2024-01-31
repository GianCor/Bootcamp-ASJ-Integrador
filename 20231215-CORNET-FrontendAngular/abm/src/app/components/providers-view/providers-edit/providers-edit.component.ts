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

  selectedCountry: any; 
  selectedState: any;
  selectedCity: any;
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
      this.providersService.getProviderById(providerId).subscribe(response=>{
        this.provider = response;
        this.taxService.getTaxes().subscribe((data) =>{
          this.IVAData = data;
          this.selectedTax = this.provider.tax;
          console.log(this.IVAData)
        });
        this.fieldService.getFields().subscribe((data)=>{
          this.fieldData = data;
          this.selectedField = this.provider.field;
          console.log(this.fieldData)
        })
        this.georef.getCountries().subscribe((data) => {
          this.countries = data;
          this.selectedCountry = this.provider.address.city.state.country;
          this.selectedState = this.provider.address.city.state;
          this.selectedCity = this.provider.address.city;
        });
      });
    });
  }

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

changeSelectedCountry() {
  this.states = this.selectedCountry.states;
}

changeSelectedState(){
  this.cities = this.selectedState.cities;
}

changeSelectedCity(){
  if(!this.showOtherCityInput){
    this.geoLocationModel = {
      id: this.selectedCity.id,
      name: this.selectedCity.name,
      state:{
        id: this.selectedState.id,
        name: this.selectedState.name,
        country:{
          id:this.selectedCountry.id,
          name:this.selectedCountry.name
        }
      }
    }
  }else{
    this.geoLocationModel = {
      id: 0,
      name: this.selectedCity,
      state:{
        id: this.selectedState.id,
        name: this.selectedState.name,
        country:{
          id:this.selectedCountry.id,
          name:this.selectedCountry.name
        }
      }
    }
  }
  console.log(this.geoLocationModel)
  this.provider.address.city = this.geoLocationModel;
  console.log(this.provider)
}

showOtherCityInput: boolean = false;

toggleOtherCityInput() {
  if (this.showOtherCityInput) {
      this.selectedCity = null;
  }
}

changeSelectedField(){
  this.provider.field = this.selectedField;
}

changeSelectedTax(){
  this.provider.tax = this.selectedTax;
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
        this.isValidEmail(this.provider.email)
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
          'El email debe ser válido';
        this.showError = true;
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
    const foundCUIT = this.providersData.some(
      (provider) => provider.cuit === cuit
    );
    return !foundCUIT;
  }
  
}
