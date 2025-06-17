import { CustomerType } from '@app/entities/Customer';
import { IOrder, OrderType } from '@app/entities/Order';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

export type GetAllOrdersParams = {
  page?: number;
  order?: 'asc' | 'desc';
  perPage?: number;
  customerType?: CustomerType;
  orderType?: OrderType;
  search?: string;
};

export type GetAllOrdersFn = (
  params: GetAllOrdersParams,
) => Promise<IPaginatedResponse<IOrder[]>>;
