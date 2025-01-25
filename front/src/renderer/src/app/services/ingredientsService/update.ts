import { httpClient } from '../httpClient';

export interface UpdateIngredientParams {
  id: string;
  icon: string;
  name: string;
}

export async function update({
  id,
  ...params
}: UpdateIngredientParams) {
  const { data } = await httpClient.put(`/ingredients/${id}`, params);

  return data;
}
