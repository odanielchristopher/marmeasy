import { IProduct } from '@app/entities/Product';

export type GetAllProductsFn = (params?: {
  search?: string;
  category?: string;
}) => Promise<IProduct[]>;
