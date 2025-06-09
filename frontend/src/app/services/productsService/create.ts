import { httpClient } from '../httpClient';

import { CreateProductFn } from './@types/CreateProductFn';

export const create: CreateProductFn = async ({
  imagePath,
  name,
  price,
  categoryId,
  description,
}) => {
  const formData = new FormData();

  if (imagePath) {
    formData.append('image', imagePath);
  }

  if (description) {
    formData.append('description', description);
  }

  if (categoryId) {
    formData.append('categoryId', categoryId);
  }

  formData.append('name', name);
  formData.append('price', price.toString());

  const { data } = await httpClient.post('/products', formData);

  return data;
};
