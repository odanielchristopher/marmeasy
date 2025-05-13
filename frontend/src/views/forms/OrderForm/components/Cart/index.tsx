import { LeafIcon, WindIcon } from 'lucide-react';
import { UseFieldArrayReturn } from 'react-hook-form';

import { cn } from '@app/lib/utils';
import { OrderFormData } from '@views/forms/OrderForm/useOrderFormController';

import { EditItemDialog } from '../EditItemDialog';
import { ItemCard } from '../ItemCard';

import { useCartController } from './useCartController';

interface ICartProps {
  items: UseFieldArrayReturn<OrderFormData>;
}

export type CartItem = OrderFormData['cartStep']['items'][number] & {
  index: number;
};

export function Cart({ items }: ICartProps) {
  const {
    hasItems,
    itemBeenEdited,
    isOpenEditItemDialog,
    handleOpenEditItemDialog,
    handleCloseEditItemDialog,
    handleUpdateItem,
    handleDecrementItem,
    handleIncrementItem,
  } = useCartController(items);

  return (
    <>
      {itemBeenEdited && isOpenEditItemDialog && (
        <EditItemDialog
          open={isOpenEditItemDialog}
          onClose={handleCloseEditItemDialog}
          item={itemBeenEdited}
          onSubmit={(newItem) => {
            handleUpdateItem(itemBeenEdited.index, newItem);
            handleCloseEditItemDialog();
          }}
        />
      )}
      <div
        className={cn(
          'space-y-4 w-full max-h-[130px] md:max-h-[276px] overflow-y-auto scrollbar-thin animate-in scale-95 transition-all',
          !hasItems && 'max-md:hidden',
        )}
      >
        {items.fields.map((item, index) => (
          <ItemCard
            key={item.productId}
            {...item}
            onEdit={() => handleOpenEditItemDialog({ ...item, index })}
            onAdd={() => handleIncrementItem(index, item)}
            onSub={() => handleDecrementItem(index, item)}
          />
        ))}

        {!hasItems && (
          <div className="flex items-end w-full justify-center text-muted-foreground">
            <WindIcon className="size-16 stroke-[1.2]" />
            <LeafIcon className="size-6 stroke-2" />
          </div>
        )}
      </div>
    </>
  );
}
