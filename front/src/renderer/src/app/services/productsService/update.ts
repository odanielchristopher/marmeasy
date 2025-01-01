import { Product } from '@renderer/app/entities/Product';
import { httpClient } from '../httpClient';

export interface UpdateProductParams {
  id: string;
  image?: File;
  name: string;
  description: string;
  price: string;
  categoryId: string;
  ingredientsIds: string[];
}

export async function update({
  id,
  image,
  name,
  description,
  price,
  categoryId,
  ingredientsIds,
}: UpdateProductParams) {
  const formData = new FormData();

  if (image) {
    formData.append('image', image);
  }

  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('categoryId', categoryId);
  formData.append('ingredientsIds', JSON.stringify(ingredientsIds));

  const { data } = await httpClient.put<Product>(`/products/${id}`, formData);

  return data;
}
