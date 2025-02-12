import { Expense } from '../entities/Expense';
import { Income } from '../entities/Income';

export interface DashboardCategories {
  expenses: Expense[];
  incomes: Income[];
}

const expenses: Expense[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    type: 'TAXES',
    value: 153.56,
  },
  {
    id: '2',
    date: new Date().toISOString(),
    type: 'EQUIPMENTS',
    value: 123.5,
  },
  {
    id: '3',
    date: new Date().toISOString(),
    type: 'EMPLOYEES',
    value: 123.5,
  },
  {
    id: '4',
    date: new Date().toISOString(),
    type: 'DELIVERY',
    value: 123.5,
  },
  {
    id: '5',
    date: new Date().toISOString(),
    type: 'GARRISONS',
    value: 123.5,
  },
  {
    id: '6',
    date: new Date().toISOString(),
    type: 'UTENSILS',
    value: 123.5,
  },
  {
    id: '7',
    date: new Date().toISOString(),
    type: 'MEATS',
    value: 123.5,
  },
];

const incomes: Income[] = [
  {
    id: '3',
    date: new Date().toISOString(),
    value: 309.49,
    clientName: 'Plataforma',
    type: 'CREDIT_CARD',
  },
  {
    id: '2',
    date: new Date().toISOString(),
    value: 309.49,
    clientName: 'Plataforma',
    type: 'DEBIT_CARD',
  },
  {
    id: '4',
    date: new Date().toISOString(),
    value: 39.29,
    clientName: 'Oficina',
    type: 'CASH',
  },
];

export const categories: DashboardCategories = {
  expenses,
  incomes,
};
