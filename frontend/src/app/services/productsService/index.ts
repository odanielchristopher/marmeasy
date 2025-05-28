import { IProductsService } from './@types/IProductsService';
import { create } from './create';
import { getAll } from './getAll';
import { remove } from './remove';
import { update } from './update';

export const productsService: IProductsService = {
  getAll,
  create,
  update,
  remove,
};
