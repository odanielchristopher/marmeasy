import { ICustomer } from '@app/entities/Customer';

export type GetAllCustomersBySearchFn = (
  search?: string,
) => Promise<ICustomer[]>;
