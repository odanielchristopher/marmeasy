export interface Payment {
  id: string;
  clientId: string;
  type: PaymentType;
  date: string;
  value: number;
}

export type PaymentType = 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH';
