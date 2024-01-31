export interface Product {
    id: number;
    sku: string;
    provider_id: number;
    providerName: string;
    category: string;
    name: string;
    description: string;
    price: string;
    amount?:number;
    subtotal?: number;
    checked?:boolean;
    created_at?: Date;
    updated_at?: Date;
  }

