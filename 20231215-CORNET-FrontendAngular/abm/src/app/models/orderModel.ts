export interface Order {
    id: number;
    provider: string;
    product: string;
    amount: number;
    emDate: Date;
    reDate: Date;
    address: string;
    total: number;
  }