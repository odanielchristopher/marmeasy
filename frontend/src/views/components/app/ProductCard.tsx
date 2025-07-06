import { SoupIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@app/lib/utils';
import { formatCurrency } from '@app/utils/formatCurrency';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/Avatar';

interface IProductCardProps {
  id: string;
  name: string;
  price: number;
  description?: string;
  imagePath?: string;
  quantity?: number;
}

export function ProductCard({
  name,
  price,
  imagePath,
  description,
  role,
  className,
  quantity,
  ...props
}: IProductCardProps & React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-card border border-gray-300 dark:border-accent p-3 rounded-xl flex gap-3 cursor-pointer transition-all',
        'relative flex gap-4 h-30 bg-white dark:bg-card border border-gray-300 dark:border-accent p-3 rounded-2xl',
        role === 'button' && 'hover:!border-primary hover:scale-[102%]',
        className,
      )}
      role={role}
      {...props}
    >
      <Avatar className="!rounded-md w-[120px] h-full">
        <AvatarImage
          src={`${import.meta.env.VITE_API_URL}/${imagePath}`}
          className="object-cover"
        />
        <AvatarFallback className="w-full h-full flex items-center justify-center bg-teal-900 !rounded-md">
          <SoupIcon className="size-7 text-gray-800" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col justify-between gap-1 relative">
        <div>
          <strong className="text-gray-800 dark:text-foreground text-base font-semibold tracking-[-0.5px] line-clamp-1">
            {name}
          </strong>

          {description && (
            <p className="text-gray-600 dark:text-gray-300 m-0 text-sm max-md:line-clamp-2 line-clamp-1 xl:line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <strong className="text-gray-800 dark:text-foreground text-base font-semibold tracking-[-0.5px]">
          {formatCurrency(price)}
        </strong>

        {quantity && (
          <span className="absolute right-0 bottom-0 font-medium">
            x{quantity}
          </span>
        )}
      </div>
    </div>
  );
}
