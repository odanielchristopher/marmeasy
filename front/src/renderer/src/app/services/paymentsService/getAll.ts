import { Payment } from '@renderer/app/entities/Payment';
import { httpClient } from '../httpClient';

export type GetAllResponse = Array<Payment>;

export interface GetAllPaymentsParams {
  clientId: string;
}

export async function getAll({ clientId }: GetAllPaymentsParams) {
  const { data } = await httpClient.get<GetAllResponse>(
    `/payments/${clientId}`,
  );

  return data;
}
