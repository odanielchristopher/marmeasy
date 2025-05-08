import { ICustomer } from '@app/entities/Customer';

import { InfiniteQueryResponse } from './InfiniteQueryResponse';

export type CustomersLoaderParams = {
  search?: string;
  perPage?: number;
};

export type CustomersLoaderResponse = {
  customers: ICustomer[];
  isLoading: boolean;
  infiniteScroll?: InfiniteQueryResponse<ICustomer[]>;
};

export type CustomersLoaderFn = (
  params: CustomersLoaderParams,
) => CustomersLoaderResponse;
