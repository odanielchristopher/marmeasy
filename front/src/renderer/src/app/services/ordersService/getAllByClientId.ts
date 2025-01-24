import { Order } from '@renderer/app/entities/Order';
import { httpClient } from '../httpClient';

export type GetAllOrdersResponse = Array<Order>;

export interface GetAllOrdersParams {
  clientId: string;
}

export async function getAllByClientId({ clientId }: GetAllOrdersParams) {
  const { data } = await httpClient.get<GetAllOrdersResponse>('/orders', {
    params: { clientId },
  });

  return data;
}
