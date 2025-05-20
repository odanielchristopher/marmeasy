import { IProductsService } from './@types/IProductsService';
import { create } from './create';
import { getAll } from './getAll';

export const productsService: IProductsService = {
  getAll,
  create,
};
