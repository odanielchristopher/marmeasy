import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ProductCategoryForm, productCategorySchema } from './schema';

export interface IUseProductCategoryFormController {
  defaultValues?: ProductCategoryForm;
  onSubmit(formData: ProductCategoryForm): void | Promise<void>;
}

export function useProductCategoryFormController({
  defaultValues,
  onSubmit,
}: IUseProductCategoryFormController) {
  const { formState, ...form } = useForm<ProductCategoryForm>({
    defaultValues: {
      icon: defaultValues?.icon ?? '🍲',
      name: defaultValues?.name ?? '',
    },
    resolver: zodResolver(productCategorySchema),
  });

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit(formData);
  });

  return {
    form,
    formState,
    handleSubmit,
  };
}
