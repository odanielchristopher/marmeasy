import { ICustomer } from '@app/entities/Customer';

import { ICreateCustomerParams } from '../customersService/create';

export interface ICustomersService {
  getAll(): Promise<ICustomer[]>;
  getOne(customerId: string): Promise<ICustomer>;
  create(params: ICreateCustomerParams): Promise<ICustomer>;
}
