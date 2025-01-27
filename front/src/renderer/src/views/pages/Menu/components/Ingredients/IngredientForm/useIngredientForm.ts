import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Ingredient } from '@renderer/app/entities/Ingredient';

import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { isEmoji } from '@renderer/app/utils/isEmoji';

const ingredientFormSchema = z.object({
  icon: z
    .string({ required_error: 'O emoji é obrigatório.' })
    .refine((value) => isEmoji(value), {
      message: 'Precisa ser um emoji.',
    }),
  name: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

export type IngredientFormData = z.infer<typeof ingredientFormSchema>;

interface UseIngredientFormProps {
  ingredientBeingEdited?: Ingredient | null;
  onSubmit(data: IngredientFormData): Promise<void>;
}

export default function useIngredientForm({
  ingredientBeingEdited,
  onSubmit,
}: UseIngredientFormProps) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<IngredientFormData>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      icon: ingredientBeingEdited?.icon ?? '🍚',
      name: capitalizeFirstLetter(ingredientBeingEdited?.name || ''),
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
