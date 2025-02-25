import { Ingredient } from '@renderer/app/entities/Ingredient';
import { httpClient } from '../httpClient';

export type GetAllResponse = Array<Ingredient>;

export async function getAll() {
  const { data } = await httpClient.get<GetAllResponse>('/ingredients');

  return data;
}
