export enum CustomerType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
}

export class Customer {
  id: string;
  name: string;
  type: CustomerType;
  color: string;
  phone?: string;
  balance: number;
}
