import { IOrder } from '@app/entities/Order';

export type GetOneOrderFn = (orderId: string) => Promise<IOrder>;
