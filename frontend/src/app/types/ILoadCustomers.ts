import { ICustomer } from '@app/entities/Customer';

import { IInfiniteQueryResponse } from './IInfiniteQueryResponse';

export type ILoadCustomers = (perPage?: number) => {
  customers: ICustomer[];
  isLoading: boolean;
} & IInfiniteQueryResponse<ICustomer[]>;
