import { Income } from '@renderer/app/entities/Income';
import { History } from '../../types';
import { mockedHttpClient } from '../mockedHttpClient';

export type GetIncomesResponse = {
  total: number;
  history: History<Income>;
};

export async function getAll() {
  const { data } = await mockedHttpClient.get<GetIncomesResponse>('/incomes');

  return data;
}
