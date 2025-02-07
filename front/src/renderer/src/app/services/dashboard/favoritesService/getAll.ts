import { mockedHttpClient } from '../mockedHttpClient';

export type Favorite = {
  id: string;
  title: string;
  quantity: number;
};

export async function getAll() {
  const { data } = await mockedHttpClient.get<Favorite[]>('/favorites');

  return data;
}
