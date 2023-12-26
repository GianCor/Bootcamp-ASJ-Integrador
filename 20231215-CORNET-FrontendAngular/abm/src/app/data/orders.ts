import { Order } from "../models/orderModel";
import { Product } from "../models/productModel";

export const orders: Order[] = [
  {
    id: '1',
    provider: '1',
    product: [{
        id: '1',
        provider: '2',
        category: '3',
        name: '4',
        description: '5',
        price: '299',
    }],
    amount: '23',
    emDate: new Date('2000-02-23'),
    reDate: new Date('2050-02-23'),
    address: 'asdasd',
    total: '10000'
  },
  {
    id: '2',
    provider: '3',
    product: [{
        id: '1',
        provider: '2',
        category: '3',
        name: '4',
        description: '5',
        price: '299',
    }],
    amount: '23',
    emDate: new Date('2000-02-23'),
    reDate: new Date('2050-02-23'),
    address: 'asdasd',
    total: '10000'
  },
  {
    id: '3',
    provider: '1',
    product: [{
        id: '1',
        provider: '2',
        category: '3',
        name: '4',
        description: '5',
        price: '299',
    }],
    amount: '23',
    emDate: new Date('2000-02-23'),
    reDate: new Date('2050-02-23'),
    address: 'asdasd',
    total: '10000'
  },
  {
    id: '4',
    provider: '1',
    product: [{
        id: '1',
        provider: '2',
        category: '3',
        name: '4',
        description: '5',
        price: '299',
    }],
    amount: '23',
    emDate: new Date('2000-02-23'),
    reDate: new Date('2050-02-23'),
    address: 'asdasd',
    total: '10000'
  },
  {
    id: '5',
    provider: '1',
    product: [{
        id: '1',
        provider: '2',
        category: '3',
        name: '4',
        description: '5',
        price: '299',
    }],
    amount: '23',
    emDate: new Date('2000-02-23'),
    reDate: new Date('2050-02-23'),
    address: 'asdasd',
    total: '10000'
  },
];