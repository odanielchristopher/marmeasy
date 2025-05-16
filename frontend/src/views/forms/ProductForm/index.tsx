import { Controller } from 'react-hook-form';

import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';
import { InputCurrency } from '@views/components/ui/InputCurrency';
import { Textarea } from '@views/components/ui/Textarea';
import { InputImage } from '@views/pages/Menu/components/Products/components/InputImage';

import { ProductFormData } from './schema';
import { useProductFormController } from './useProductFormController';

interface IProductFormProps {
  defaultValues?: ProductFormData;
  onSubmit(formData: ProductFormData): Promise<void> | void;
  buttonLabel: string;
  isLoading?: boolean;
}

export function ProductForm({
  defaultValues,
  buttonLabel,
  isLoading,
  onSubmit,
}: IProductFormProps) {
  const { form, formState, handleSubmit } = useProductFormController({
    defaultValues,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h4 className="font-medium text-sm text-gray-600 dark:text-muted-foreground mb-3">
          Imagem
        </h4>

        <Controller
          control={form.control}
          name="imagePath"
          render={({ field: { onChange, value } }) => (
            <InputImage value={value} onChange={onChange} />
          )}
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-sm text-gray-600 dark:text-muted-foreground mb-3">
          Informações
        </h4>

        <Input
          placeholder="Nome*"
          {...form.register('name')}
          error={formState.errors.name?.message}
        />

        <Textarea
          placeholder="Descrição"
          className="resize-none max-h-[52px]"
          maxLength={90}
          {...form.register('description')}
          error={formState.errors.description?.message}
        />

        <Controller
          control={form.control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <InputCurrency
              placeholder="Preço*"
              variant="normalInput"
              value={value}
              onChange={onChange}
              error={formState.errors.price?.message}
            />
          )}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !formState.isDirty}
        isLoading={isLoading}
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
