import { Product } from "./productModel";

export interface Provider {
  id: number;
  supplierCode: string;
  name: string;
  field: Field;
  phone: string;
  tax: Tax;
  address: Address;
  cuit: string;
  email: string;
  contact: Contact;
  created_at?: Date;
  updated_at?: Date;
  website?: string;
  deleted?: boolean;
  url?: string;
  products?: Product[];
}

export interface Contact {
  id: number;
  contactName: string;
  contactLastName: string;
  contactPhone: string;
  contactEmail: string;
  contactRole: string;
}

export interface Address {
id: number;
street: string;
number: string;
cp:'';
city: City;
}

export interface City {
id: number;
name: string;
state: State; 
}

export interface Country {
id: number;
name: string;
}

export interface Tax {
  id: number;
  name: string;
  deleted?: boolean;
  editing?: boolean;
  }

export interface Field {
id: number;
name: string;
deleted?: boolean;
editing?: boolean;
}

export interface State {
id: number;
name:string;
country:Country;
}