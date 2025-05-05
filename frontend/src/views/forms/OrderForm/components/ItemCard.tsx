import {
  CircleMinusIcon,
  CirclePlusIcon,
  PencilIcon,
  SoupIcon,
} from 'lucide-react';

import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { formatCurrency } from '@app/utils/formatCurrency';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/Avatar';
import { Button } from '@views/components/ui/Button';

interface IItemCardProps {
  name: string;
  unitPrice: number;
  quantity: number;
  imagePath?: string;
  onEdit(): void;
  onSub(): void;
  onAdd(): void;
}

export function ItemCard({
  name,
  unitPrice,
  quantity,
  imagePath,
  onEdit,
  onSub,
  onAdd,
}: IItemCardProps) {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-1">
        <Avatar className="!rounded-md w-14 h-12 mr-3">
          <AvatarImage src={imagePath} className="object-cover" />
          <AvatarFallback className="w-full flex-1 bg-teal-900 !rounded-md">
            <SoupIcon className="size-4 text-gray-800 dark:text-gray-100" />
          </AvatarFallback>
        </Avatar>

        <small className="text-sm font-normal text-gray-600 dark:text-gray-400">
          {quantity}x
        </small>

        <div className="ml-2 flex flex-col">
          <strong className="text-sm font-semibold line-clamp-1">
            {capitalizeFirstLetter(name)}
          </strong>

          <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
            {formatCurrency(unitPrice)}
          </span>
        </div>
      </div>

      <div className="flex gap-1">
        <Button
          type="button"
          variant="ghost"
          className="text-primary h-fit p-3 text-base"
          onClick={onEdit}
        >
          <PencilIcon className="size-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="text-primary h-fit p-3 text-base"
          onClick={onSub}
        >
          <CircleMinusIcon className="size-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="text-primary h-fit p-3 text-base"
          onClick={onAdd}
        >
          <CirclePlusIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
