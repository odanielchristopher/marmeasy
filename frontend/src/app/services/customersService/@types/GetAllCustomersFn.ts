import { ICustomer } from '@app/entities/Customer';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

import { GetAllCustomersParams } from '../getAll';

export type GetAllCustomersFn = (
  params: GetAllCustomersParams,
) => Promise<IPaginatedResponse<ICustomer[]>>;
