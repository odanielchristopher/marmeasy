import { CircleX } from 'lucide-react';

import { cn } from '@app/lib/utils';

export function FieldError({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div className={cn('flex gap-1 items-center mt-1', className)}>
      <CircleX className="w-4 h-4 text-red-500" />
      <span className="text-red-500 text-[14px]">{message}</span>
    </div>
  );
}
