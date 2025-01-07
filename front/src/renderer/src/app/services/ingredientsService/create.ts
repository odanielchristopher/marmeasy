import { httpClient } from '../httpClient';

export interface CreateIngredientParams {
  icon: string;
  name: string;
}

export async function create(params: CreateIngredientParams) {
  const { data } = await httpClient.post('/ingredients', params);

  return data;
}
