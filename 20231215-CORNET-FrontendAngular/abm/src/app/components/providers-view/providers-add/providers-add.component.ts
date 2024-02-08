import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { condicionFrenteAlIva } from 'src/app/models/condicionFrenteIvaModel';
import { Field, Provider, Tax } from 'src/app/models/providerModel';
import { FieldService } from 'src/app/services/field.service';
import { GeorefService } from 'src/app/services/georef.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { TaxService } from 'src/app/services/tax.service';

@Component({
  selector: 'app-providers-add',
  templateUrl: './providers-add.component.html',
  styleUrls: ['./providers-add.component.css'],
})
export class ProvidersAddComponent {
  providersData: Provider[] = [];
  IVAData: Tax[] = [];
  fieldData: any[] =[];
  showError: boolean = false;
  showSuccess: boolean = false;
  selectedCountry: any; 
  selectedState: any;
  selectedCity: any;
  selectedField: any;
  selectedTax: any;

  newField: Field = {
    id:0,
    name:''
  }

  newTax: Tax = {
    id:0,
    name:''
  }

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
  selectedFieldToEdit!: Field;
  switchedField = false;


  constructor(
    private providersService: ProvidersService,
    private georef: GeorefService,
    private taxService: TaxService,
    private fieldService: FieldService,
  ) {}

  postField(field: Field) {
    field.deleted = false;
    this.fieldService.postField(field).subscribe(response => {
      console.log(response)
      this.fieldService.getFields().subscribe((data)=>{
        this.fieldData = data;
        console.log(this.fieldData)
        this.newField.name = '';
      })
    })
  }

  switchToInputField(field: Field){
    field.editing == true ? field.editing = false : field.editing = true;
    if(field.editing == true){
      this.selectedField = field.name;
    }
  }

  cancelEditingField(field: Field){
    field.name = this.selectedField;
  }

  updateField(field: Field){
    this.switchToInputField(field);
    this.fieldService.updateField(field).subscribe((response) => console.log(response))
  }

  deleteField(field: Field){
    field.deleted = true;
    this.fieldService.updateField(field).subscribe((response)=>console.log(response))
  }

  editField(editedField: Field){
    this.fieldService.updateField(editedField).subscribe()
  }


  postTax(tax: Tax) {
    tax.deleted = false;
    this.taxService.postTax(tax).subscribe(response => {
      console.log(response)
      this.taxService.getTaxes().subscribe((data)=>{
        this.IVAData = data;
        console.log(this.IVAData)
        this.newTax.name = '';
      })
    })
  }

  switchToInputTax(tax: Tax){
    tax.editing == true ? tax.editing = false : tax.editing = true;
    if(tax.editing == true){
      this.selectedTax = tax.name;
    }
  }

  cancelEditingTax(tax: Tax){
    tax.name = this.selectedTax;
  }

  updateTax(tax: Tax){
    this.switchToInputTax(tax);
    this.taxService.updateTax(tax).subscribe((response) => console.log(response))
  }

  deleteTax(tax: Tax){
    tax.deleted = true;
    this.taxService.updateTax(tax).subscribe((response)=>console.log(response))
  }

  editTax(editedTax: Tax){
    this.taxService.updateTax(editedTax).subscribe()
  }


  ngOnInit() {
    this.getProvidersData();
    this.taxService.getTaxes().subscribe((data) =>{
      this.IVAData = data;
      console.log(this.IVAData)
    });
    this.fieldService.getFields().subscribe((data)=>{
      this.fieldData = data;
      console.log(this.fieldData)
    })
    this.georef.getCountries().subscribe((data) => {
      this.countries = data;
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
    this.providersService.getData().subscribe(response =>{
      this.providersData = response;  
    })
    console.log(this.providersData);
  }

  pushProvidersData(form: NgForm) {
    if (form.valid) {
      if (this.isUniqueId(this.provider.supplierCode) && this.isUniqueAndNumericCUIT(this.provider.cuit) && this.isValidEmail(this.provider.email)) {
        console.log(this.provider);
        this.providersService.postData(this.provider).subscribe(response => console.log(response));
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
    const found = this.providersData.some((provider) => provider.supplierCode == id);
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
