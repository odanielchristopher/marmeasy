import { IPayment, PaymentType } from '@app/entities/Payment';

export type CreatePaymentParams = {
  customerId: string;
  type: PaymentType;
  date: string;
  value: number;
  description?: string;
};

export type CreatePaymentFn = (
  params: CreatePaymentParams,
) => Promise<IPayment>;
