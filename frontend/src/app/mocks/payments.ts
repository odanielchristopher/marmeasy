import { IPayment } from '@app/entities/Payment';

export const payments: IPayment[] = [
  {
    id: '1',
    customerId: '1',
    date: new Date().toISOString(),
    type: 'CASH',
    value: 230.4,
    description: 'Adiatamento do mês de abril',
  },
  {
    id: '2',
    customerId: '1',
    date: new Date().toISOString(),
    type: 'DEBIT',
    value: 14,
    description: 'Pagemento do dia 05 de fevereiro',
  },
  {
    id: '3',
    customerId: '1',
    date: new Date().toISOString(),
    type: 'CREDIT',
    value: 230.4,
  },
];
