import { ICustomersService } from '../@types/ICustomersService';

import { create } from './create';
import { getAll } from './getAll';

export const customersService: ICustomersService = {
  getAll,
  create,
};
