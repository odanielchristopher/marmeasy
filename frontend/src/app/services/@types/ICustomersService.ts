import { ICustomer } from '@app/entities/Customer';

export interface ICustomersService {
  getAll(): Promise<ICustomer[]>;
}
