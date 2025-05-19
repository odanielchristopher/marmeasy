export enum OrderType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}

export class Order {
  id: string;
  userId: string;
  customerId: string;
  date: string;
  type: OrderType;
  amount: number;
}
