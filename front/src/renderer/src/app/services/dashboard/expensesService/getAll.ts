import { Expense } from '@renderer/app/entities/Expense';
import { httpClient } from '../../httpClient';
import { History } from '../../types';

export type GetExpensesResponse = {
  total: number;
  history: History<Expense>;
};

export async function getAll() {
  const { data } = await httpClient.get<GetExpensesResponse>('/dashboard/expenses');

  return data;
}
