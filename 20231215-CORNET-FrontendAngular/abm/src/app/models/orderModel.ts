import { Product } from "./productModel";

export interface Order {
  id: number;
  numOrder: string;
  provider: string;
  emDate: Date;
  reDate: Date;
  description: string;
  pending: boolean;
  name?: string;
  completed: boolean;
  canceled: boolean;
  total?: number;
  created_at?: Date;
  updated_at?: Date;
  orderProducts: OrderProduct[];
}

export interface OrderProduct {
  id: number;
  product: Product;
  amount: number;
  price: number;
  subtotal: number;
}