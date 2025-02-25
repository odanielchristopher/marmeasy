import { iconsMap } from './iconsMap';

interface PaymentIconProps {
  type: PaymentIconType;
}

export type PaymentIconType = 'cash' | 'debitCard' | 'creditCard';

export function PaymentIcon({ type }: PaymentIconProps) {
  const Icon = iconsMap[type] ?? iconsMap['cash'];

  return <Icon />;
}
