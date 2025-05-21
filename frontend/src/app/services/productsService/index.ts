import { IProductsService } from './@types/IProductsService';
import { create } from './create';
import { getAll } from './getAll';
import { update } from './update';

export const productsService: IProductsService = {
  getAll,
  create,
  update,
};
