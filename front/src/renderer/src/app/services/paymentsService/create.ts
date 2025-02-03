import { PaymentType } from '@renderer/app/entities/Payment';
import { httpClient } from '../httpClient';

export interface CreatePaymentParams {
  clientId: string;
  type: PaymentType;
  date: string;
  value: number;
}

export async function create(params: CreatePaymentParams) {
  const { data } = await httpClient.post('/payments', params);

  return data;
}
