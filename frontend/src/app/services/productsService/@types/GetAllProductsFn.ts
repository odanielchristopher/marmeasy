import { IProduct } from '@app/entities/Product';

export type GetAllProductsFn = () => Promise<IProduct[]>;
