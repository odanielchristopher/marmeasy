import { PaymentIconType } from '@renderer/assets/Icons/payments/PaymentIcon';
import { PaymentType } from '../entities/Payment';

export const paymentsTypeMapToView = {
  CREDIT_CARD: 'Crédito',
  DEBIT_CARD: 'Débito',
  CASH: 'Dinheiro',
};

export const paymentsTypeMapToIcon: Record<PaymentType, PaymentIconType> = {
  CREDIT_CARD: 'creditCard',
  DEBIT_CARD: 'debitCard',
  CASH: 'cash',
};
