import { Product } from '@renderer/app/entities/Product';
import { httpClient } from '../httpClient';

export type GetAllOrdersResponse = Array<Product>;

export interface GetAllOrdersParams {
  clientId: string;
}

export async function getAllByClientId({ clientId }: GetAllOrdersParams) {

  const { data } = await httpClient.get<GetAllOrdersResponse>('/orders', {
    params: { clientId },
  });

  return data;
}
