import { ICustomer } from '@app/entities/Customer';
import { CustomerFilters } from '@views/pages/Customers/components/FiltersModal';

import { InfiniteQueryResponse } from './InfiniteQueryResponse';

export type CustomersLoaderParams = {
  search?: string;
  perPage?: number;
  filters?: CustomerFilters;
};

export type CustomersLoaderResponse = {
  customers: ICustomer[];
  isLoading: boolean;
  infiniteScroll?: InfiniteQueryResponse<ICustomer[]>;
};

export type CustomersLoaderFn = (
  params: CustomersLoaderParams,
) => CustomersLoaderResponse;
