import { ICustomersService } from '../@types/ICustomersService';

import { getAll } from './getAll';

export const customersService: ICustomersService = {
  getAll,
};
