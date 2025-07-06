import { IOrder, OrderType } from '@app/entities/Order';

export type CreateOrderParams = {
  customerId: string;
  date: string;
  type: OrderType;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
};

export type CreateOrderResponse = Promise<IOrder>;

export type CreateOrderFn = (params: CreateOrderParams) => CreateOrderResponse;
