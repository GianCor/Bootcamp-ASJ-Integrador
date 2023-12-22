export interface Provider {
  id: number;
  name: string;
  field: string;
  phone: number;
  state: string;
  city: string;
  iva: string;
  address: string;
  cuit: number;
  email: string;
  contactName: string; // Nombre del contacto
  contactLastName: string; // Apellido del contacto
  website: string; // Sitio web
}