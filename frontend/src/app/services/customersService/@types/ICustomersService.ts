import { CreateCustomerFn } from './CreateCustomerFn';
import { GetAllCustomersBySearchFn } from './GetAllCustomersBySearchFn';
import { GetAllCustomersFn } from './GetAllCustomersFn';
import { GetOneCustomerFn } from './GetOneCustomerFn';
import { RemoveCustomerFn } from './RemoveCustomerFn';
import { UpdateCustomerFn } from './UpdateCustomerFn';

export interface ICustomersService {
  getAll: GetAllCustomersFn;
  getAllBySearch: GetAllCustomersBySearchFn;
  getOne: GetOneCustomerFn;
  create: CreateCustomerFn;
  update: UpdateCustomerFn;
  remove: RemoveCustomerFn;
}
