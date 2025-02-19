import { httpClient } from '../httpClient';

export interface RemovePaymentParams {
  id: string;
}

export async function remove(params: RemovePaymentParams) {
  await httpClient.delete(`/payments/${params.id}`);
}
