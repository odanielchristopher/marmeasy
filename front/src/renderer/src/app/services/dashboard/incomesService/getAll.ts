import { Income } from '@renderer/app/entities/Income';
import { httpClient } from '../../httpClient';
import { History } from '../../types';

export type GetIncomesResponse = {
  total: number;
  history: History<Income>[];
};

export async function getAll(type?: string) {
  const { data } = await httpClient.get<GetIncomesResponse>(
    '/dashboard/incomes',
    {
      params: {
        type,
      },
    },
  );

  return data;
}
