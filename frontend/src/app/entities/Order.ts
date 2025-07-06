import { CustomerType } from './Customer';
import { IOrderItem } from './OrderItem';

export type OrderType = 'BREAKFAST' | 'LUNCH' | 'DINNER';

export interface IOrder {
  id: string;
  customer: {
    id: string;
    name: string;
    type: CustomerType;
    color: string;
  };
  date: string;
  type: OrderType;
  items: IOrderItem[];
  amount: string;
}
