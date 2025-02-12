import { PaymentType } from 'src/modules/payments/entities/payment.entity';

export class Income {
  id: string;
  clientName: string;
  date: string;
  value: number;
  type: PaymentType;
}
