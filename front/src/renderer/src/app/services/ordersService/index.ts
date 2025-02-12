import { create } from './create';
import { getAll } from './getAll';
import { getBySearchTerm } from './getBySearchTerm';
import { remove } from './remove';
import { update } from './update';

export const ordersService = {
  getAll,
  create,
  update,
  remove,
  getBySearchTerm,
};
