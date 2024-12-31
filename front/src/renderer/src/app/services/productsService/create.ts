import { Client } from '@renderer/app/entities/Client';
import { httpClient } from '../httpClient';

export interface CreateProductParams {
  image: File;
  name: string;
  description: string;
  price: string;
  categoryId: string;
  ingredientsIds: string[];
}

export async function create(params: CreateProductParams) {
  const { data } = await httpClient.post<Client>('/clients', params);

  return data;
}
