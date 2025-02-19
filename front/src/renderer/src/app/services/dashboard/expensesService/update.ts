import { ExpenseType } from '@renderer/app/entities/Expense';
import { httpClient } from '../../httpClient';

export interface UpdateExpenseParams {
  id: string;
  date: string;
  value: number;
  type: ExpenseType;
}

export async function update({ id, ...params }: UpdateExpenseParams) {
  const { data } = await httpClient.put(`/expenses/${id}`, params);

  return data;
}
