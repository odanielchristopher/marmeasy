import { httpClient } from '../../httpClient';

export interface RemoveExpenseParams {
  id: string;
}

export async function remove(params: RemoveExpenseParams) {
  await httpClient.delete(`/expenses/${params.id}`);
}
