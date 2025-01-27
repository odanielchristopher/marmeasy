export interface Payment {
  clientId: string;
  type: 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH';
  date: string;
  value: number;
}
