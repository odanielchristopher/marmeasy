import { PaymentType } from './Payment';

export interface Income {
  id: string;
  clientName: string;
  value: number;
  type: PaymentType;
}
