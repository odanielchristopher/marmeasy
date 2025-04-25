import { Payment } from '../entities/payment.entity';

export const IValidatePaymentOwnershipService = Symbol(
  'IValidatePaymentOwnershipService',
);

export interface IValidatePaymentOwnershipService {
  validate(userId: string, paymentId: string): Promise<Payment>;
}
