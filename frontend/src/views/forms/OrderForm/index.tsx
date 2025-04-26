import { FormProvider } from 'react-hook-form';

import { Stepper } from '@views/components/app/Stepper';

import { DataStep } from './steps/DataStep';
import { ProductsStep } from './steps/ProductsStep';
import {
  OrderFormData,
  useOrderFormController,
} from './useOrderFormController';

interface IOrderFormProps {
  defaultValues?: OrderFormData;
  onSubmit(formData: OrderFormData): Promise<void> | void;
}

export function OrderForm({ defaultValues, onSubmit }: IOrderFormProps) {
  const { form, handleSubmit } = useOrderFormController({
    defaultValues,
    onSubmit,
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
