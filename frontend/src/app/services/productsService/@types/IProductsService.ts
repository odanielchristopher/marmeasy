import { CreateProductFn } from './CreateProductFn';
import { GetAllProductsFn } from './GetAllProductsFn';
import { UpdateProductFn } from './UpdateProductFn';

export interface IProductsService {
  getAll: GetAllProductsFn;
  create: CreateProductFn;
  update: UpdateProductFn;
}
