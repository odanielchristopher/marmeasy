import { ICustomersService } from '../@types/ICustomersService';

import { create } from './create';
import { getAll } from './getAll';
import { getAllBySearch } from './getAllBySearch';
import { getOne } from './getOne';

export const customersService: ICustomersService = {
  getAll,
  getAllBySearch,
  getOne,
  create,
};
