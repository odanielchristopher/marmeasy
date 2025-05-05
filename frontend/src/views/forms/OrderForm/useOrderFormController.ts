import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { IProduct } from '@app/entities/IProduct';
import { products } from '@app/mocks/products';

import { cartStepSchema } from './steps/CartStep/schema';
import { dataStepSchema } from './steps/DataStep/schema';

const orderSchema = z.object({
  cartStep: cartStepSchema,
  dataStep: dataStepSchema,
});

export type OrderFormData = z.infer<typeof orderSchema>;

interface IUseOrderFormController {
  defaultValues?: OrderFormData;
  onSubmit(formData: OrderFormData): Promise<void> | void;
}

export function useOrderFormController({
  defaultValues,
  onSubmit,
}: IUseOrderFormController) {
  const form = useForm<OrderFormData>({
    defaultValues: {
      cartStep: {
        items: defaultValues?.cartStep.items ?? [],
      },
      dataStep: {
        customer: defaultValues?.dataStep.customer ?? { id: '', name: '' },
        orderType: defaultValues?.dataStep.orderType,
        date: defaultValues?.dataStep.date ?? new Date(),
      },
    },
    resolver: zodResolver(orderSchema),
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    await onSubmit(formData);
  });

  const cartControl = useFieldArray({
    control: form.control,
    name: 'cartStep.items',
  });

  function handleAddToCart({ id, ...product }: IProduct) {
    cartControl.append({
      ...product,
      quantity: 1,
      productId: id,
      unitPrice: product.price,
    });
  }

  const addedProductIds = useMemo(
    () => new Set(cartControl.fields.map((p) => p.productId)),
    [cartControl.fields],
  );

  return {
    form,
    products,
    cartControl,
    addedProductIds,
    handleAddToCart,
    handleSubmit,
  };
}
