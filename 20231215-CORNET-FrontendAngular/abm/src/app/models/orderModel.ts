import { Product } from "./productModel";

export interface Order {
    id: string;
    provider: string;
    product: Product[];
    amount: string;
    emDate: Date;
    reDate: Date;
    address: string;
    total: string;
  }