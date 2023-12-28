import { Product } from "./productModel";

export interface Provider {
  id: string;
  name: string;
  field: string;
  phone: string;
  country: string;
  state?: string;
  city?: string;
  iva: string;
  address: string;
  cuit: string;
  cp:string;
  email: string;
  role?: string;
  contactName: string;
  contactLastName: string; 
  website?: string;
  url?: string;
  products?: Product[];
}