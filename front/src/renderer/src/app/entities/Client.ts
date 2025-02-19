import { Payment } from './Payment';

export interface Client {
  id: string;
  name: string;
  type: 'FISICO' | 'JURIDICO';
  phone?: string;
  address?: string;
  document?: string;
  balance?: number | string;
  payments: Payment[];
}
