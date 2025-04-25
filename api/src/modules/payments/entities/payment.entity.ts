export enum PaymentType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  CASH = 'CASH',
}

export class Payment {
  id: string;
  userId: string;
  clientId: string;
  type: PaymentType;
  date: string;
  value: number;
}
