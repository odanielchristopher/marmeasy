import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Stepper } from '../Stepper';

import { DataStep } from './steps/DataStep';
import { dataStepSchema } from './steps/DataStep/schema';
import { ProductsStep } from './steps/ProductsStep';
import { productsStepSchema } from './steps/ProductsStep/schema';

const orderSchema = z.object({
  productsStep: productsStepSchema,
  dataStep: dataStepSchema,
});

export type FormData = z.infer<typeof orderSchema>;

export function OrderForm() {
  const form = useForm<FormData>({
    defaultValues: {
      productsStep: {
        items: [],
      },
      dataStep: {
        customer: { id: '', name: '' },
        date: new Date(),
      },
    },
    resolver: zodResolver(orderSchema),
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <Stepper
          className="max-h-[580px] flex flex-col"
          steps={[
            {
              label: 'Products',
              content: <ProductsStep />,
            },
            {
              label: 'Data',
              content: <DataStep />,
            },
          ]}
        />
      </form>
    </FormProvider>
  );
}
