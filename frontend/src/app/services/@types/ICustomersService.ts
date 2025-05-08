import { ICustomer } from '@app/entities/Customer';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

import { ICreateCustomerParams } from '../customersService/create';
import { GetAllCustomersParams } from '../customersService/getAll';

export interface ICustomersService {
  getAll(
    params: GetAllCustomersParams,
  ): Promise<IPaginatedResponse<ICustomer[]>>;
  getOne(customerId: string): Promise<ICustomer>;
  create(params: ICreateCustomerParams): Promise<ICustomer>;
}
