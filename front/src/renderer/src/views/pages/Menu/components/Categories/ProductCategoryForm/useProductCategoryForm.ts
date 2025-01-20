import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ProductCategory } from '@renderer/app/entities/ProductCategory';

import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { isEmoji } from '@renderer/app/utils/isEmoji';

const categoryFormSchema = z.object({
  icon: z
    .string({ required_error: 'O emoji é obrigatório.' })
    .refine((value) => isEmoji(value), {
      message: 'Precisa ser um emoji.',
    }),
  name: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

export type ProductCategoryFormData = z.infer<typeof categoryFormSchema>

interface UseProductCategoryFormProps {
  category?: ProductCategory | null
  onSubmit(data: ProductCategoryFormData): Promise<void>
}

export default function useProductCategoryForm({
  category,
  onSubmit,
}: UseProductCategoryFormProps) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<ProductCategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      icon: category?.icon ?? '🍝',
      name: capitalizeFirstLetter(category?.name || ''),
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await onSubmit(data);
  });

  return {
    errors,
    register,
    handleSubmit,
  };
}
