import { useMemo } from 'react';
import {
  useFieldArray,
  UseFieldArrayUpdate,
  useFormContext,
} from 'react-hook-form';

import { IProduct } from '@app/entities/IProduct';
import { useStepper } from '@app/hooks/useStepper';

import { FormData } from '../..';

export const products: IProduct[] = [
  {
    id: String(Math.random()),
    imagePath: 'https://github.com/odanielchristopher.png',
    name: 'Quatro Queijos',
    description: 'Pizza de Quatro Queijos com borda tradicional',
    price: 40,
  },
  {
    id: String(Math.random()),
    name: 'Frango com Catupiry',
    description: 'Pizza de Frango com Catupiry e borda tradicional',
    price: 45,
  },
  {
    id: String(Math.random()),
    name: 'Frango com Catupiry',
    price: 45,
  },
];

export function useProductsStepController() {
  const form = useFormContext<FormData>();

  const cartItemsControl = useFieldArray({
    control: form.control,
    name: 'productsStep.items',
  });

  function handleAddToCart({ id, ...product }: IProduct) {
    cartItemsControl.append({
      ...product,
      quantity: 1,
      productId: id,
    });
  }

  const handleIncrementItem: UseFieldArrayUpdate<
    FormData,
    'productsStep.items'
  > = (index, item) => {
    cartItemsControl.update(index, {
      ...item,
      quantity: item.quantity + 1,
    });
  };

  const handleDecrementItem: UseFieldArrayUpdate<
    FormData,
    'productsStep.items'
  > = (index, item) => {
    if (cartItemsControl.fields[index].quantity === 1) {
      cartItemsControl.remove(index);
      return;
    }

    cartItemsControl.update(index, {
      ...item,
      quantity: item.quantity - 1,
    });
  };

  const addedProductIds = useMemo(
    () => new Set(cartItemsControl.fields.map((p) => p.productId)),
    [cartItemsControl.fields],
  );
  const amount = useMemo(
    () =>
      cartItemsControl.fields.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      ),
    [cartItemsControl.fields],
  );

  const { nextStep } = useStepper();

  async function handleNextStep() {
    const isValid = await form.trigger('productsStep', {
      shouldFocus: true,
    });

    if (isValid) {
      nextStep();
    }
  }

  const hasItems = cartItemsControl.fields.length > 0;

  return {
    form,
    formState: form.formState,
    errors: form.formState.errors,
    cartItems: cartItemsControl.fields,
    products,
    addedProductIds,
    hasItems,
    amount,
    handleAddToCart,
    handleNextStep,
    handleIncrementItem,
    handleDecrementItem,
  };
}
