import { Users } from 'lucide-react';

import { SVG_STROKE } from '@app/config/constants';
import { cn } from '@app/lib/utils';

interface ICustomerProps {
  className?: string;
}

export function Customers({ className }: ICustomerProps) {
  return (
    <Users
      className={cn('size-6 text-gray-800', className)}
      strokeWidth={SVG_STROKE}
    />
  );
}
