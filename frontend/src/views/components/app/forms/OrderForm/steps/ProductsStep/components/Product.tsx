import { CirclePlusIcon, SoupIcon } from 'lucide-react';

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
  isDisabled?: boolean;
  onAdd(): void;
}

export function Product({ onAdd, isDisabled, ...product }: IProductProps) {
  return (
    <>
      <Avatar className="!rounded-md w-[120px] h-full">
        <AvatarImage src={product.imagePath} className="object-cover" />
        <AvatarFallback className="w-full h-full flex items-center justify-center bg-teal-900 !rounded-md">
          <SoupIcon className="size-7 text-gray-800" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col justify-between gap-1">
        <div>
          <strong className="text-gray-800 dark:text-foreground text-base font-semibold tracking-[-0.5px]">
            {product.name}
          </strong>

          {product.description && (
            <p className="text-gray-600 dark:text-gray-300 m-0 text-sm">
              {product.description}
            </p>
          )}
        </div>

        <strong className="text-gray-800 dark:text-foreground text-base font-semibold tracking-[-0.5px]">
          R$ {product.price}
        </strong>
      </div>

      <button
        type="button"
        className="absolute right-0 bottom-0 text-primary disabled:opacity-50"
        onClick={onAdd}
        disabled={isDisabled}
      >
        <CirclePlusIcon />
      </button>
    </>
  );
}
