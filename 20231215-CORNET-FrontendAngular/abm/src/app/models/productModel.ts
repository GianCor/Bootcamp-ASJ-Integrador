export interface Product {
    id: number;
    sku: string;
    supplier_id: number;
    supplierName: string;
    category: Category;
    name: string;
    description: string;
    price: string;
    amount?:number;
    subtotal?: number;
    deleted?: boolean;
    checked?:boolean;
    created_at?: Date;
    updated_at?: Date;
    url?: string;
  }

export interface Category{
  id: number;
  name: string;
  deleted?: boolean;
  editing?: boolean
}