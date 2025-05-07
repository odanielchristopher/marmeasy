import { ICustomer } from '@app/entities/Customer';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

import { ICreateCustomerParams } from '../customersService/create';

export interface ICustomersService {
  getAll(
    page?: number,
    perPage?: number,
  ): Promise<IPaginatedResponse<ICustomer[]>>;
  getOne(customerId: string): Promise<ICustomer>;
  create(params: ICreateCustomerParams): Promise<ICustomer>;
}
