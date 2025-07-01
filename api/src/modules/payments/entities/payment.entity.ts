export enum PaymentType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  CASH = 'CASH',
}

export class Payment {
  id: string;
  userId: string;
  customerId: string;
  type: PaymentType;
  date: string;
  value: number;
}
