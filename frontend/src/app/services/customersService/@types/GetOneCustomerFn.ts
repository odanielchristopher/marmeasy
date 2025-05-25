import { ICustomer } from '@app/entities/Customer';

export type GetOneCustomerFn = (customerId: string) => Promise<ICustomer>;
