export enum ExpenseType {
  TAXES,
  DELIVERY,
  EQUIPMENTS,
  EMPLOYEES,
  UTENSILS,
  MEATS,
  GARRISONS,
  OTHERS,
}

export class Expense {
  id: string;
  type: ExpenseType;
  date: string;
  value: number;
}
