import { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { IProduct } from '@app/entities/IProduct';
import { useStepper } from '@app/hooks/useStepper';
import { products } from '@app/mocks/products';

import { OrderFormData } from '../../useOrderFormController';

export function useProductsStepController() {
  const form = useFormContext<OrderFormData>();

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
    cartItems: cartItemsControl,
    products,
    addedProductIds,
    hasItems,
    amount,
    handleAddToCart,
    handleNextStep,
  };
}
