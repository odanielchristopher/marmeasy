import { Client } from '../entities/Client';
import { payments } from './payments';

export const clients: Client[] = [
  {
    id: 'adww',
    name: 'daniel',
    type: 'FISICO',
    payments: payments,
  },
];
