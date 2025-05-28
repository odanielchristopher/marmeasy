import { IProductCategory } from '@app/entities/ProductCategories';

export type CreateProductCategoryParams = {
  name: string;
  icon: string;
};

export type CreateProductCategoryResponse = Promise<IProductCategory>;

export type CreateProductCategoryFn = (
  params: CreateProductCategoryParams,
) => CreateProductCategoryResponse;
