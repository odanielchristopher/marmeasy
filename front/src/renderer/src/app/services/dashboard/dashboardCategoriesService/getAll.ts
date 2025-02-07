import { Expense } from '@renderer/app/entities/Expense';
import { Income } from '@renderer/app/entities/Income';
import { mockedHttpClient } from '../mockedHttpClient';

export type Categories = {
  incomes: Income[];
  expenses: Expense[];
}

export async function getAll() {
  const { data } = await mockedHttpClient.get<Categories>('/categories');

  return data;
}
