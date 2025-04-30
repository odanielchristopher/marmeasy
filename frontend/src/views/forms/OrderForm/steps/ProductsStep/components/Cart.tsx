import {
  CircleMinusIcon,
  CirclePlusIcon,
  PencilIcon,
  SoupIcon,
} from 'lucide-react';
import { useState } from 'react';
import { UseFieldArrayReturn, UseFieldArrayUpdate } from 'react-hook-form';

import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/Avatar';
import { Button } from '@views/components/ui/Button';
import { Modal } from '@views/components/ui/Modal';
import { OrderFormData } from '@views/forms/OrderForm/useOrderFormController';

interface ICartProps {
  items: UseFieldArrayReturn<OrderFormData>;
}

export function Cart({ items }: ICartProps) {
  const [open, setOpen] = useState(false);

  const handleIncrementItem: UseFieldArrayUpdate<
    OrderFormData,
    'productsStep.items'
  > = (index, item) => {
    items.update(index, {
      ...item,
      quantity: item.quantity + 1,
    });
  };

  const handleDecrementItem: UseFieldArrayUpdate<
    OrderFormData,
    'productsStep.items'
  > = (index, item) => {
    if (items.fields[index].quantity === 1) {
      items.remove(index);
      return;
    }

    items.update(index, {
      ...item,
      quantity: item.quantity - 1,
    });
  };

  return (
    <div className="space-y-4 max-h-[130px] overflow-y-auto scrollbar-thin animate-in scale-95 transition-all">
      {items.fields.map((item, index) => (
        <div key={item.id} className="py-3 flex justify-between items-center">
          {open && (
            <Modal
              open
              onClose={() => setOpen(false)}
              title={capitalizeFirstLetter(item.name)}
            >
              <div>item</div>
            </Modal>
          )}
          <div className="flex">
            <Avatar className="!rounded-md w-14 h-12 mr-3">
              <AvatarImage src={item.imagePath} className="object-cover" />
              <AvatarFallback className="w-full flex-1 bg-teal-900 !rounded-md">
                <SoupIcon className="size-4 text-gray-800 dark:text-gray-100" />
              </AvatarFallback>
            </Avatar>

            <small className="text-sm font-normal text-gray-600 dark:text-gray-400">
              {item.quantity}x
            </small>

            <div className="ml-2">
              <strong className="block text-sm font-semibold">
                {capitalizeFirstLetter(item.name)}
              </strong>

              <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                R$ {item.price}
              </span>
            </div>
          </div>

          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              className="text-primary h-fit p-3 text-base"
              onClick={() => setOpen(true)}
            >
              <PencilIcon className="size-5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="text-primary h-fit p-3 text-base"
              onClick={() => handleIncrementItem(index, item)}
            >
              <CirclePlusIcon className="size-5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="text-primary h-fit p-3 text-base"
              onClick={() => handleDecrementItem(index, item)}
            >
              <CircleMinusIcon className="size-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
