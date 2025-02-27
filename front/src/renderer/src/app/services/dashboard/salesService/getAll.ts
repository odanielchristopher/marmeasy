import { Sale } from '@renderer/app/entities/Sale';
import { httpClient } from '../../httpClient';
import { History } from '../../types';

export type GetsalesResponse = {
  total: number;
  history: History<Sale>[];
};

export async function getAll() {
  const { data } = await httpClient.get<GetsalesResponse>('/dashboard/sales');

  return data;
}
