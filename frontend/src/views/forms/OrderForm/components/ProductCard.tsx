import { CirclePlusIcon, SoupIcon } from 'lucide-react';

import { formatCurrency } from '@app/utils/formatCurrency';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/Avatar';

interface IProductProps {
  id: string;
  name: string;
  price: number;
  description?: string;
  imagePath?: string;
  onAdd(): void;
}

export function ProductCard({ onAdd, ...product }: IProductProps) {
  return (
    <div className="relative flex gap-4 h-30 bg-white dark:bg-card border border-gray-300 dark:border-accent p-3 rounded-2xl">
      <Avatar className="!rounded-md w-[120px] h-full">
        <AvatarImage src={product.imagePath} className="object-cover" />
        <AvatarFallback className="w-full h-full flex items-center justify-center bg-teal-900 !rounded-md">
          <SoupIcon className="size-7 text-gray-800" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col justify-between gap-1">
        <div>
          <strong className="text-gray-800 dark:text-foreground max-md:line-clamp-1 text-base font-semibold tracking-[-0.5px]">
            {product.name}
          </strong>

          <p className="text-gray-600 dark:text-gray-300 m-0 text-sm max-md:line-clamp-2 line-clamp-1 xl:line-clamp-2">
            {product.description}
          </p>
        </div>

        <strong className="text-gray-800 dark:text-foreground text-base font-semibold tracking-[-0.5px]">
          {formatCurrency(product.price)}
        </strong>
      </div>

      <button
        type="button"
        className="absolute right-3 bottom-3 text-primary disabled:opacity-50"
        onClick={onAdd}
      >
        <CirclePlusIcon />
      </button>
    </div>
  );
}
