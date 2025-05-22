import { httpClient } from '../httpClient';

import {
  UpdateProductFn,
  UpdateProductResponse,
} from './@types/UpdateProductFn';

export const update: UpdateProductFn = async ({
  id,
  imagePath,
  name,
  price,
  categoryId,
  description,
  removeImage,
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

  const { data } = await httpClient.put<UpdateProductResponse>(
    `/products/${id}`,
    formData,
    {
      params: {
        removeImage,
      },
    },
  );

  return data;
};
