export interface Expense {
  id: string;
  date: string;
  value: number;
  type: ExpenseType;
}

export type ExpenseType =
  | 'TAXES'
  | 'DELIVERY'
  | 'EQUIPMENTS'
  | 'EMPLOYEES'
  | 'UTENSILS'
  | 'MEATS'
  | 'GARRISONS'
  | 'OTHERS';
