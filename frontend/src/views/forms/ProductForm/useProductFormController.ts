import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useProductCategories } from '@app/hooks/productCategories/useProductCategories';

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
      imagePath: defaultValues?.imagePath
        ? `${import.meta.env.VITE_API_URL}/${defaultValues.imagePath}`
        : undefined,
      name: defaultValues?.name ?? '',
      price: defaultValues?.price ?? '',
      description: defaultValues?.description ?? '',
      categoryId: defaultValues?.categoryId ?? '',
    },
    resolver: zodResolver(productSchema),
  });

  const { categories } = useProductCategories();

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit(formData);
  });

  return {
    form,
    formState,
    categories,
    handleSubmit,
  };
}
