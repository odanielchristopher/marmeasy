import { CreateProductFn } from './CreateProductFn';
import { GetAllProductsFn } from './GetAllProductsFn';
import { RemoveProductFn } from './RemoveProductFn';
import { UpdateProductFn } from './UpdateProductFn';

export interface IProductsService {
  getAll: GetAllProductsFn;
  create: CreateProductFn;
  update: UpdateProductFn;
  remove: RemoveProductFn;
}
