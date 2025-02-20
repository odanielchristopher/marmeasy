import { Item } from './OrderItem';

export interface Order {
  id: string;
  clientId: string;
  date: Date;
  items: Item[];
  status: 'PEDINDG' | 'PAID';
  discount: number;
  totalValue: number;
}
