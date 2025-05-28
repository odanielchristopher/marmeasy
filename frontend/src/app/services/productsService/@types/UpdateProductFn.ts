import { IProduct } from '@app/entities/Product';

export type UpdateProductParams = {
  id: string;
  name: string;
  price: number;
  imagePath?: File;
  categoryId?: string;
  description?: string;
  removeImage?: boolean;
};

export type UpdateProductResponse = Promise<IProduct>;

export type UpdateProductFn = (
  params: UpdateProductParams,
) => UpdateProductResponse;
