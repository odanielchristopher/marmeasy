import { customerIconsMap } from './customerIconsMap';

interface ICustomerIconProps {
  type?: string;
  className?: string;
}

export function CustomerIcon({
  type = 'default',
  className,
}: ICustomerIconProps) {
  const Icon =
    customerIconsMap[type as keyof typeof customerIconsMap] ??
    customerIconsMap.default;

  return <Icon className={className} />;
}
