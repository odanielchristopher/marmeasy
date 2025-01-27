import { Payment } from '../entities/Payment';

export const payments: Payment[] = [
  {
    clientId: 'k4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9c',
    type: 'CASH',
    date: new Date().toISOString(),
    value: 150.75,
  },
  {
    clientId: 'i4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9b',
    type: 'CREDIT_CARD',
    date: new Date().toISOString(),
    value: 100.75,
  },
  {
    clientId: 'h4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9a',
    type: 'DEBIT_CARD',
    date: new Date().toISOString(),
    value: 14.75,
  },
  {
    clientId: 'g4e8ed1b-95c8-4bff-b28c-e4fd14ac4b9d',
    type: 'CASH',
    date: new Date().toISOString(),
    value: 12.75,
  },
];
