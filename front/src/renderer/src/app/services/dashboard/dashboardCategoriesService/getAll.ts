import { Expense } from '@renderer/app/entities/Expense';
import { Income } from '@renderer/app/entities/Income';
import { httpClient } from '../../httpClient';

export type Categories = {
  incomes: Income[];
  expenses: Expense[];
};

export async function getAll() {
  const { data } = await httpClient.get<Categories>('/dashboard/categories');

  return data;
}
