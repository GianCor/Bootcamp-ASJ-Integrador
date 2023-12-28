import { Product } from "./productModel";

export interface Order {
    id: string;
    provider: string;
    product: Product[];
    emDate: Date;
    reDate: Date;
    description: string;
    pending: boolean;
    completed: boolean;
    canceled: boolean;
    total?: number;
  }