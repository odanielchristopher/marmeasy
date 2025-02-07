import { Sale } from '@renderer/app/entities/Sale';
import { History } from '../../types';
import { mockedHttpClient } from '../mockedHttpClient';

export type GetsalesResponse = {
  total: number;
  history: History<Sale>;
};

export async function getAll() {
  const { data } = await mockedHttpClient.get<GetsalesResponse>('/sales');

  return data;
}
