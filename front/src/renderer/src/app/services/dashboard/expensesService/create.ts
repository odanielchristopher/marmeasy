import { ExpenseType } from '@renderer/app/entities/Expense';
import { httpClient } from '../../httpClient';

export interface CreateExpenseParams {
  date: string;
  value: number;
  type: ExpenseType;
}

export async function create(params: CreateExpenseParams) {
  const { data } = await httpClient.post('/expenses', params);

  return data;
}
