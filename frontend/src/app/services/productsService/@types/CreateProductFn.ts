import { IProduct } from '@app/entities/Product';

export type CreateProductParams = {
  name: string;
  price: number;
  imagePath?: File;
  categoryId?: string;
  description?: string;
};

export type CreateProductResponse = Promise<IProduct>;

export type CreateProductFn = (
  params: CreateProductParams,
) => CreateProductResponse;
