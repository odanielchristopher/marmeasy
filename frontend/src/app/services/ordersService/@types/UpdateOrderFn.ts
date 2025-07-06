import { IOrder, OrderType } from '@app/entities/Order';

export type UpdateOrderParams = {
  id: string;
  customerId: string;
  date: string;
  type: OrderType;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
};

export type UpdateOrderResponse = Promise<IOrder>;

export type UpdateOrderFn = (params: UpdateOrderParams) => UpdateOrderResponse;
