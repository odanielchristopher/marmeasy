import { CustomerType, ICustomer } from '@app/entities/Customer';

export interface ICreateCustomerParams {
  name: string;
  type: CustomerType;
  phone?: string;
  color: string;
  initialBalance: number;
}

export type CreateCustomerFn = (
  params: ICreateCustomerParams,
) => Promise<ICustomer>;
