import { PaymentType } from './Payment';

export interface Income {
  id: string;
  clientName: string;
  date: string;
  value: number;
  type: PaymentType;
}
