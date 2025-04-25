export interface ICustomer {
  id: string;
  name: string;
  type: 'INDIVIDUAL' | 'BUSINESS';
  color: string;
  balance: number;
}
