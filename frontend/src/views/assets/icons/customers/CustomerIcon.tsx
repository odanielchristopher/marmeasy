import { customerIconsMap } from './customerIconsMap';

interface ICustomerIconProps {
  type?: keyof typeof customerIconsMap;
  className?: string;
}

export function CategoryIcon({
  type = 'default',
  className,
}: ICustomerIconProps) {
  const Icon = customerIconsMap[type];

  return <Icon className={className} />;
}
