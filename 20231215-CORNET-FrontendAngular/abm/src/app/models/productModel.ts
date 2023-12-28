export interface Product {
    id: string;
    provider: string;
    providerName: string;
    category: string;
    name: string;
    description: string;
    price: string;
    amount?:number;
    subtotal?: number;
    checked?:boolean;
  }