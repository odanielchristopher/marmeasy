import { Users } from 'lucide-react';

import { SVG_STROKE } from '@app/config/constants';
import { cn } from '@app/lib/utils';

interface ICustomerProps {
  className?: string;
  color?: string;
}

export function Customers({ className, color }: ICustomerProps) {
  return (
    <Users
      className={cn('size-6 text-gray-800', className)}
      strokeWidth={SVG_STROKE}
      color={color}
    />
  );
}
