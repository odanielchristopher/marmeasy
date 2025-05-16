import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ProductFormData, productSchema } from './schema';

interface IUseProductFormControllerProps {
  defaultValues?: ProductFormData;
  onSubmit(formData: ProductFormData): Promise<void> | void;
}

export function useProductFormController({
  defaultValues,
  onSubmit,
}: IUseProductFormControllerProps) {
  const { formState, ...form } = useForm<ProductFormData>({
    defaultValues: {
      imagePath: defaultValues?.imagePath,
      name: defaultValues?.name ?? '',
      price: defaultValues?.price ?? '',
      description: defaultValues?.description ?? '',
    },
    resolver: zodResolver(productSchema),
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
