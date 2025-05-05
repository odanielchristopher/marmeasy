import { FormProvider } from 'react-hook-form';

import { useIsMobile } from '@app/hooks/useIsMobile';
import { cn } from '@app/lib/utils';
import { Stepper } from '@views/components/app/Stepper';
import { InputSearch } from '@views/components/ui/InputSearch';

import { ProductCard } from './components/ProductCard';
import { CartStep } from './steps/CartStep';
import { DataStep } from './steps/DataStep';
import {
  OrderFormData,
  useOrderFormController,
} from './useOrderFormController';

interface IOrderFormProps {
  defaultValues?: OrderFormData;
  onSubmit(formData: OrderFormData): Promise<void> | void;
  submitButtonLabel: string;
}

export function OrderForm({
  defaultValues,
  submitButtonLabel,
  onSubmit,
}: IOrderFormProps) {
  const {
    form,
    products,
    cartControl,
    addedProductIds,
    handleAddToCart,
    handleSubmit,
  } = useOrderFormController({
    defaultValues,
    onSubmit,
  });
  const isMobile = useIsMobile();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="md:flex md:gap-6 md:items-start relative"
      >
        <div className="space-y-5">
          <InputSearch
            placeholder="Procure pelo cardápio"
            className="max-w-[600px]"
          />

          <div className="flex-1 overflow-y-auto scrollbar-thin grid grid-cols-1 md:pb-6 lg:grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard
                {...product}
                key={product.id}
                onAdd={() => handleAddToCart(product)}
                isDisabled={addedProductIds.has(product.id)}
              />
            ))}
          </div>
        </div>

        <Stepper
          className={cn(
            'max-h-[580px] flex flex-col bg-white dark:bg-card p-4 rounded-t-2xl border border-gray-300 dark:border-accent mt-3',
            'sticky bottom-0 inset-x-0 z-50 w-[100vw] -mx-4',
            'md:max-w-[420px] md:static md:z-0 md:max-h-fit md:m-0 md:rounded-md',
          )}
          hasHeader={!isMobile}
          steps={[
            {
              label: 'Carrinho',
              content: <CartStep cartControl={cartControl} />,
            },
            {
              label: 'Mais informações',
              content: <DataStep buttonLabel={submitButtonLabel} />,
            },
          ]}
        />
      </form>
    </FormProvider>
  );
}
