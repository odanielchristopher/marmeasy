import { PaymentType } from '@renderer/app/entities/Payment';
import { httpClient } from '../httpClient';

export interface UpdatePaymentParams {
  id: string;
  clientId: string;
  type: PaymentType;
  date: string;
  value: number;
}

export async function update({ id, ...params }: UpdatePaymentParams) {
  const { data } = await httpClient.put(`/payments/${id}`, params);

  return data;
}
