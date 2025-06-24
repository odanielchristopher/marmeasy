import { IOrdersService } from './@types/IOrdersService';
import { create } from './create';
import { getAll } from './getAll';
import { getOne } from './getOne';
import { update } from './update';

export const ordersService: IOrdersService = {
  getAll,
  getOne,
  create,
  update,
};
