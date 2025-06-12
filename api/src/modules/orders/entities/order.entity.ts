import { CustomerType } from 'src/modules/customers/entities/customer.entity';

export enum OrderType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}

export class OrderItem {
  id: string;
  orderId: string;
  quantity: number;
  unitPrice: string;
  product?: {
    id: string;
    name: string;
    imagePath: string;
  };
}

export class Order {
  id: string;
  customer: {
    id: string;
    name: string;
    type: CustomerType;
    color: string;
  };
  date: Date;
  type: OrderType;
  items: OrderItem[];
  amount: string;
}
