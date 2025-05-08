import { ICustomer } from '@app/entities/Customer';
import { IUseCustomersParams } from '@app/hooks/useCustomers';

import { IInfiniteQueryResponse } from './IInfiniteQueryResponse';

export type ILoadCustomers = (params: IUseCustomersParams) => {
  customers: ICustomer[];
  isLoading: boolean;
  infiniteScroll?: IInfiniteQueryResponse<ICustomer[]>;
};
