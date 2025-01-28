import { Ingredient } from '@renderer/app/entities/Ingredient';
import { httpClient } from '../httpClient';

export type GetAllResponse = Array<Ingredient>;

interface GetAllParams {
  clientId: string;
}

export async function getAll({ clientId }: GetAllParams) {
  const { data } = await httpClient.get<GetAllResponse>(`/payments/${clientId}`);

  return data;
}
