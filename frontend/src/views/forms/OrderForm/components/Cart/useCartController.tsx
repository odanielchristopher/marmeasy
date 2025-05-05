import { useState } from 'react';
import { UseFieldArrayReturn, UseFieldArrayUpdate } from 'react-hook-form';

import { OrderFormData } from '../../useOrderFormController';

import { CartItem } from '.';

export function useCartController(items: UseFieldArrayReturn<OrderFormData>) {
  const [isOpenEditItemDialog, setIsOpenEditItemDialog] = useState(false);
  const [itemBeenEdited, setItemBeenEdited] = useState<CartItem | null>(null);

  const hasItems = items.fields.length > 0;

  function handleOpenEditItemDialog(item: CartItem) {
    setItemBeenEdited(item);
    setIsOpenEditItemDialog(true);
  }
  function handleCloseEditItemDialog() {
    setItemBeenEdited(null);
    setIsOpenEditItemDialog(false);
  }

  const handleIncrementItem: UseFieldArrayUpdate<
    OrderFormData,
    'cartStep.items'
  > = (index, item) => {
    items.update(index, {
      ...item,
      quantity: item.quantity + 1,
    });
  };

  const handleDecrementItem: UseFieldArrayUpdate<
    OrderFormData,
    'cartStep.items'
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

  const handleUpdateItem: UseFieldArrayUpdate<
    OrderFormData,
    'cartStep.items'
  > = (index, item) => {
    items.update(index, item);
  };

  return {
    itemBeenEdited,
    isOpenEditItemDialog,
    hasItems,
    handleIncrementItem,
    handleDecrementItem,
    handleUpdateItem,
    handleOpenEditItemDialog,
    handleCloseEditItemDialog,
  };
}
