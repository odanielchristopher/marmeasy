import { Product } from '@renderer/app/entities/Product';
import { httpClient } from '../httpClient';

export interface CreateProductParams {
  image: File;
  name: string;
  description: string;
  price: string;
  categoryId: string;
  ingredientsIds: string[];
}

export async function create({
  image,
  name,
  description,
  price,
  categoryId,
  ingredientsIds,
}: CreateProductParams) {
  const formData = new FormData();

  formData.append('image', image);
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('categoryId', categoryId);
  formData.append('ingredientsIds', JSON.stringify(ingredientsIds));

  const { data } = await httpClient.post<Product>('/products', formData);

  return data;
}
