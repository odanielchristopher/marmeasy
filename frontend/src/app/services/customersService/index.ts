import { ICustomersService } from './@types/ICustomersService';
import { create } from './create';
import { getAll } from './getAll';
import { getAllBySearch } from './getAllBySearch';
import { getOne } from './getOne';
import { remove } from './remove';
import { update } from './update';

export const customersService: ICustomersService = {
  getAll,
  getAllBySearch,
  getOne,
  create,
  update,
  remove,
};
