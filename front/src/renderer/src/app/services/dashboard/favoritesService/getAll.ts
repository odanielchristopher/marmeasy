import { httpClient } from '../../httpClient';

export type Favorite = {
  id: string;
  title: string;
  quantity: number;
};

export async function getAll() {
  const { data } = await httpClient.get<Favorite[]>('/dashboard/favorites');

  return data;
}
