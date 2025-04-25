import { cn } from '@app/lib/utils';

import { customerIconsMap } from './customerIconsMap';

interface ICustomerIconProps {
  type?: string;
  className?: string;
  color?: string;
}

const bgsMap = {
  '#FA5252': 'bg-red-100',
  '#E64980': 'bg-pink-100',
  '#BE4BDB': 'bg-grape-100',
  '#7950F2': 'bg-violet-100',
  '#4C6EF5': 'bg-indigo-100',
  '#228BE6': 'bg-blue-100',
  '#15AABF': 'bg-cyan-100',
  '#12B886': 'bg-teal-100',
  '#82C91E': 'bg-green-50',
  '#FAB005': 'bg-yellow-100',
  '#FD7E14': 'bg-orange-100',
};

export function CustomerIcon({
  type = 'default',
  className,
  color,
}: ICustomerIconProps) {
  const Icon =
    customerIconsMap[type as keyof typeof customerIconsMap] ??
    customerIconsMap.default;

  if (color) {
    return (
      <div
        className={cn(
          'p-2 rounded-full w-fit',
          bgsMap[color as keyof typeof bgsMap],
        )}
      >
        <Icon className={className} color={color} />
      </div>
    );
  }

  return <Icon className={className} />;
}
