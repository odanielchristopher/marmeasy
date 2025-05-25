import { ICustomer } from '@app/entities/Customer';

import { ICreateCustomerParams } from '../create';

export type CreateCustomerFn = (
  params: ICreateCustomerParams,
) => Promise<ICustomer>;
