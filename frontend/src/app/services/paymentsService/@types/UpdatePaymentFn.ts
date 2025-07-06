import { IPayment, PaymentType } from '@app/entities/Payment';

export type UpdatePaymentParams = {
  id: string;
  customerId: string;
  type: PaymentType;
  date: string;
  value: number;
  description?: string;
};

export type UpdatePaymentFn = (
  params: UpdatePaymentParams,
) => Promise<IPayment>;
