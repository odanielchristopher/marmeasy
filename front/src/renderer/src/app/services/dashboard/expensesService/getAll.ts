import { Expense } from '@renderer/app/entities/Expense';
import { History } from '../../types';
import { mockedHttpClient } from '../mockedHttpClient';

export type GetExpensesResponse = {
  total: number;
  history: History<Expense>;
};

export async function getAll() {
  const { data } = await mockedHttpClient.get<GetExpensesResponse>('/expenses');

  return data;
}
