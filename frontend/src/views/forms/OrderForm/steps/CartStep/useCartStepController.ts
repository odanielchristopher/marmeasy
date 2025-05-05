import { Decimal } from 'decimal.js';
import { useMemo } from 'react';
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form';

import { useStepper } from '@app/hooks/useStepper';
import { products } from '@app/mocks/products';

import { OrderFormData } from '../../useOrderFormController';

export function useCartStepController(
  cartControl: UseFieldArrayReturn<OrderFormData>,
) {
  const form = useFormContext<OrderFormData>();

  const addedProductIds = useMemo(
    () => new Set(cartControl.fields.map((p) => p.productId)),
    [cartControl.fields],
  );
  const amount = useMemo(() => {
    const result = cartControl.fields.reduce((acc, item) => {
      const subtotal = new Decimal(item.unitPrice).times(item.quantity);
      return acc.plus(subtotal);
    }, new Decimal(0));

    return Number(result.toFixed(2));
  }, [cartControl.fields]);

  const { nextStep } = useStepper();

  async function handleNextStep() {
    const isValid = await form.trigger('cartStep', {
      shouldFocus: true,
    });

    if (isValid) {
      nextStep();
    }
  }

  const hasItems = cartControl.fields.length > 0;

  return {
    form,
    formState: form.formState,
    errors: form.formState.errors,
    products,
    addedProductIds,
    hasItems,
    amount,
    handleNextStep,
  };
}
