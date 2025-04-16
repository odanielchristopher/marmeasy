import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { dataStepSchema } from './steps/DataStep/schema';
import { productsStepSchema } from './steps/ProductsStep/schema';

const orderSchema = z.object({
  productsStep: productsStepSchema,
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
      productsStep: {
        items: defaultValues?.productsStep.items ?? [],
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

  return {
    form,
    handleSubmit,
  };
}
