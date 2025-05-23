import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ProductCategoryForm, productCategorySchema } from './schema';

export interface IUseProductCategoryFormController {
  defaultValues?: ProductCategoryForm;
  onConfirm(formData: ProductCategoryForm): void | Promise<void>;
}

export function useProductCategoryFormController({
  defaultValues,
  onConfirm,
}: IUseProductCategoryFormController) {
  const { formState, ...form } = useForm<ProductCategoryForm>({
    defaultValues: {
      icon: defaultValues?.icon ?? '🍲',
      name: defaultValues?.name ?? '',
    },
    resolver: zodResolver(productCategorySchema),
  });

  const handleSubmit = form.handleSubmit((formData) => {
    onConfirm(formData);
  });

  return {
    form,
    formState,
    handleSubmit,
  };
}
