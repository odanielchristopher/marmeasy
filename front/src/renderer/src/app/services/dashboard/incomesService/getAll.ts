import { Income } from '@renderer/app/entities/Income';
import { httpClient } from '../../httpClient';
import { History } from '../../types';

export type GetIncomesResponse = {
  total: number;
  history: History<Income>;
};

export async function getAll() {
  const { data } = await httpClient.get<GetIncomesResponse>('/dashboard/incomes');

  return data;
}
