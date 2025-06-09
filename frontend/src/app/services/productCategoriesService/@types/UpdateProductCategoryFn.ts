import { IProductCategory } from '@app/entities/ProductCategories';

export type UpdateProductCategoryParams = {
  id: string;
  name: string;
  icon: string;
};

export type UpdateProductCategoryResponse = Promise<IProductCategory>;

export type UpdateProductCategoryFn = (
  params: UpdateProductCategoryParams,
) => UpdateProductCategoryResponse;
