import { CircleMinusIcon, CirclePlusIcon, SoupIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/Avatar';

interface IItemProps {
  name: string;
  price: number;
  quantity: number;
  imagePath?: string;
  onAdd(): void;
  onSub(): void;
}

export function Item({
  imagePath,
  name,
  price,
  quantity,
  onAdd,
  onSub,
}: IItemProps) {
  return (
    <>
      <div className="flex">
        <Avatar className="!rounded-md w-14 h-12 mr-3">
          <AvatarImage src={imagePath} className="object-cover" />
          <AvatarFallback className="w-full flex-1 bg-teal-900 !rounded-md">
            <SoupIcon className="size-4 text-gray-800 dark:text-gray-100" />
          </AvatarFallback>
        </Avatar>

        <small className="text-sm font-normal text-gray-600 dark:text-gray-400">
          {quantity}x
        </small>

        <div className="ml-2">
          <strong className="block text-sm font-semibold">{name}</strong>

          <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
            R$ {price}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button type="button" className="text-primary" onClick={onAdd}>
          <CirclePlusIcon />
        </button>

        <button type="button" className="text-primary" onClick={onSub}>
          <CircleMinusIcon />
        </button>
      </div>
    </>
  );
}
