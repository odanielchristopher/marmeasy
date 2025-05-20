import { ICustomer } from '@app/entities/Customer';

export type CreateProductParams = {
  name: string;
  price: number;
  imagePath?: File;
  categoryId?: string;
  description?: string;
};

export type CreateProductResponse = Promise<ICustomer>;

export type CreateProductFn = (
  params: CreateProductParams,
) => CreateProductResponse;
