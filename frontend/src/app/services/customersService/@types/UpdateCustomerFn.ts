import { CustomerType, ICustomer } from '@app/entities/Customer';

export interface IUpdateCustomerParams {
  id: string;
  name: string;
  type: CustomerType;
  phone?: string;
  color: string;
  initialBalance: number;
}

export type UpdateCustomerFn = (
  params: IUpdateCustomerParams,
) => Promise<ICustomer>;
