import { CreateProductCategoryFn } from './CreateProductCategoryFn';
import { GetAllProductCategoriesFn } from './GetAllProductCategoriesFn';
import { RemoveProductCategoryFn } from './RemoveProductCategoryFn';
import { UpdateProductCategoryFn } from './UpdateProductCategoryFn';

export interface IProductCategoriesService {
  getAll: GetAllProductCategoriesFn;
  create: CreateProductCategoryFn;
  update: UpdateProductCategoryFn;
  remove: RemoveProductCategoryFn;
}
