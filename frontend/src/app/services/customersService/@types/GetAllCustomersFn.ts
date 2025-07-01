import { ICustomer } from '@app/entities/Customer';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';
import { CustomerFilters } from '@views/pages/Customers/components/FiltersModal';

export type GetAllCustomersParams = {
  page?: number;
  perPage?: number;
  filters?: CustomerFilters;
};

export type GetAllCustomersFn = (
  params: GetAllCustomersParams,
) => Promise<IPaginatedResponse<ICustomer[]>>;
