import { IOrder } from '@app/entities/Order';

export const orders: IOrder[] = [
  {
    id: '123',
    customer: {
      id: '8c36fe40-a7b8-4695-9b92-5c21de9c2f9c',
      name: 'Ellen',
      type: 'INDIVIDUAL',
      color: '#40C057',
    },
    type: 'BREAKFAST',
    amount: 57,
    date: new Date().toISOString(),
    items: [
      {
        product: {
          id: '5dee6d67-fb5f-45f9-97ac-7786064ea9f2',
          name: 'Marmita Grande',
          description: 'Marmita com duas misturas possíveis.',
        },
        quantity: 3,
        unitPrice: 15,
      },
      {
        product: {
          id: '5dee6d67-fb5f-45f9-97ac-7786064ea9f1',
          name: 'Marmita Média',
        },
        quantity: 1,
        unitPrice: 12,
      },
    ],
  },
  {
    id: '1234',
    customer: {
      id: '8c36fe40-a7b8-4695-9b92-5c21de9c2f9c',
      name: 'Ellen',
      type: 'INDIVIDUAL',
      color: '#40C057',
    },
    type: 'DINNER',
    amount: 24,
    date: new Date().toISOString(),
    items: [
      {
        product: {
          id: '5dee6d67-fb5f-45f9-97ac-7786064ea9f2',
          name: 'Marmita Grande',
        },
        quantity: 2,
        unitPrice: 12,
      },
    ],
  },
];
