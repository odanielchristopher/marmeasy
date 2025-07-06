import { IOrdersService } from './@types/IOrdersService';
import { create } from './create';
import { getAll } from './getAll';
import { getOne } from './getOne';
import { remove } from './remove';
import { update } from './update';

export const ordersService: IOrdersService = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
