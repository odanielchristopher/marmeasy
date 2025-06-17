import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { IProduct } from '@app/entities/Product';
import { useProducts } from '@app/hooks/products/useProducts';
import { SearchTermFormData } from '@views/components/ui/InputSearch';

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
        customerId: defaultValues?.dataStep.customerId ?? '',
        orderType: defaultValues?.dataStep.orderType,
        date: defaultValues?.dataStep.date ?? new Date(),
      },
    },
    resolver: zodResolver(orderSchema),
  });

  const [searchProductsTerm, setSearchProductsTerm] = useState('');

  const { products, isLoading } = useProducts({
    search: searchProductsTerm,
    category: '',
  });

  const hasProducts = products.length > 0;

  const handleSubmit = form.handleSubmit(async (formData) => {
    await onSubmit(formData);
  });

  const cartControl = useFieldArray({
    control: form.control,
    name: 'cartStep.items',
  });

  function handleAddToCart({ id, ...product }: IProduct) {
    const itemIndex = cartControl.fields.findIndex(
      (item) => item.productId === id,
    );

    if (itemIndex < 0) {
      cartControl.append({
        ...product,
        quantity: 1,
        productId: id,
        unitPrice: product.price,
      });

      return;
    }

    const prevItem = cartControl.fields[itemIndex];
    cartControl.update(itemIndex, {
      ...prevItem,
      quantity: prevItem.quantity + 1,
    });
  }

  function handleSearchTerm({ searchTerm }: SearchTermFormData) {
    setSearchProductsTerm(searchTerm);
  }

  return {
    form,
    products,
    isLoadingProducts: isLoading,
    hasProducts,
    cartControl,
    handleSearchTerm,
    handleAddToCart,
    handleSubmit,
  };
}
