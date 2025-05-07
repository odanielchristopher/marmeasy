import { ICustomer } from '@app/entities/Customer';

import { IPaginatedResponse } from './IPaginatedResponse';
import { IUsePaginationResponse } from './IUsePagination';

export type ILoadCustomers = (perPage?: number) => {
  customers: IPaginatedResponse<ICustomer[]>;
  isLoading: boolean;
  pagination: IUsePaginationResponse;
};
