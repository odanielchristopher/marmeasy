import { paymentIconsMap } from './paymentIconsMap';

interface ICustomerIconProps {
  type?: string;
  className?: string;
}

export function PaymentIcon({
  type = 'default',
  className,
}: ICustomerIconProps) {
  const Icon =
    paymentIconsMap[type as keyof typeof paymentIconsMap] ??
    paymentIconsMap.default;

  return <Icon className={className} />;
}
