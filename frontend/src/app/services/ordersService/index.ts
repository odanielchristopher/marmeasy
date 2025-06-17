import { IOrdersService } from './@types/IOrdersService';
import { getAll } from './getAll';
import { getOne } from './getOne';

export const ordersService: IOrdersService = {
  getAll,
  getOne,
};
