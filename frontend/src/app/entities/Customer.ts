export type CustomerType = 'INDIVIDUAL' | 'BUSINESS';

export interface ICustomer {
  id: string;
  name: string;
  phone?: string;
  type: CustomerType;
  color: string;
  balance: number;
}
