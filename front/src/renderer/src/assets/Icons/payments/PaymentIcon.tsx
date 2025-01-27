import { iconsMap } from './iconsMap';

interface CategoryIconProps {
  type: 'cash' | 'debitCard' | 'creditCard';
}

export function PaymentIcon({ type }: CategoryIconProps) {
  const Icon = iconsMap[type] ?? iconsMap['cash'];

  return <Icon />;
}
