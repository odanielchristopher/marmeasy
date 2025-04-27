import { ICustomersService } from '../@types/ICustomersService';

import { create } from './create';
import { getAll } from './getAll';
import { getOne } from './getOne';

export const customersService: ICustomersService = {
  getAll,
  getOne,
  create,
};
