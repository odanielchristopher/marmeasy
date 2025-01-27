import { Payment } from '../entities/Payment';

export const payments: Payment[] = [
  {
    id:'g4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c',
    clientId: 'k4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c',
    type: 'CASH',
    date: new Date().toISOString(),
    value: 150.75,
  },
  {
    id:'k4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c',
    clientId: 'k4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c',
    type: 'CREDIT_CARD',
    date: new Date().toISOString(),
    value: 123.75,
  },
  {
    id:'f4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c',
    clientId: 'k4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c',
    type: 'DEBIT_CARD',
    date: new Date().toISOString(),
    value: 89.75,
  },
];
