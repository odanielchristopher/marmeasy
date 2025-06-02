export enum OrderType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}

export class OrderItem {
  id?: string;
  orderId?: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export class Order {
  id: string;
  customerId: string;
  date: Date;
  type: OrderType;
  items: OrderItem[];
  amount: number;
}
