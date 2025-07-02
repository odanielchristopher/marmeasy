import { IPayment } from '@app/entities/Payment';
import { IPaginatedResponse } from '@app/types/IPaginatedResponse';

export type GetAllPaymentsParams = {
  page?: number;
  perPage?: number;
  order?: 'asc' | 'desc';
  dateRange?: { from?: string; to?: string };
};

export type GetAllPaymentsFn = (
  customerId: string,
  params: GetAllPaymentsParams,
) => Promise<IPaginatedResponse<IPayment[]>>;
