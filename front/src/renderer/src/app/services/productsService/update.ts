import { Product } from '@renderer/app/entities/Product';
import { httpClient } from '../httpClient';

export interface UpdateProductParams {
  id: string;
  image?: File;
  name: string;
  description?: string;
  price: string;
  categoryId: string;
  ingredientsIds: string[];
  removeImage: boolean;
}

export async function update({
  id,
  image,
  name,
  description,
  price,
  categoryId,
  ingredientsIds,
  removeImage,
}: UpdateProductParams) {
  const formData = new FormData();

  if (image) {
    formData.append('image', image);
  }

  if (description) {
    formData.append('description', description);
  }

  formData.append('name', name);
  formData.append('price', price);
  formData.append('categoryId', categoryId);
  ingredientsIds.forEach((id) => formData.append('ingredientsIds[]', id));

  const { data } = await httpClient.put<Product>(
    `/products/${id}?removeImage=${removeImage}`,
    formData,
  );

  return data;
}
