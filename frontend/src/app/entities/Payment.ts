export type PaymentType = 'CREDIT' | 'DEBIT' | 'CASH';

export interface IPayment {
  id: string;
  customerId: string;
  type: PaymentType;
  date: string;
  value: number;
  description?: string;
}
