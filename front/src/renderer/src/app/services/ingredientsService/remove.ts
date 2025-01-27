import { httpClient } from '../httpClient';

export interface RemoveIngredientParams {
  id: string;
}

export async function remove(params: RemoveIngredientParams) {
  await httpClient.delete(`/ingredients/${params.id}`);
}
