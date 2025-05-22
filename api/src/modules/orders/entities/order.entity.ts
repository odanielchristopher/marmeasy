export enum OrderType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}

export class OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export class Order {
  id: string;
  userId: string;
  customerId: string;
  date: string;
  type: OrderType;
  items: OrderItem[];
  amount: number;
}
