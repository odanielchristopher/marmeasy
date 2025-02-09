export enum ExpenseType {
  TAXES = 'TAXES',
  DELIVERY = 'DELIVERY',
  EQUIPMENTS = 'EQUIPMENTS',
  EMPLOYEES = 'EMPLOYEES',
  UTENSILS = 'UTENSILS',
  MEATS = 'MEATS',
  GARRISONS = 'GARRISONS',
  OTHERS = 'OTHERS',
}

export class Expense {
  id: string;
  type: ExpenseType;
  date: string;
  value: number;
}
