import { CreateProductFn } from './createProductFn';
import { GetAllProductsFn } from './GetAllProductsFn';

export interface IProductsService {
  getAll: GetAllProductsFn;
  create: CreateProductFn;
}
