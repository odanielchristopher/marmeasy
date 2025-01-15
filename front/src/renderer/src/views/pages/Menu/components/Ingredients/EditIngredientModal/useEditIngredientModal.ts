import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Ingredient } from '@renderer/app/entities/Ingredient';

import { queryClient } from '@renderer/App';
import { ingredientsService } from '@renderer/app/services/ingredientsService';
import { UpdateIngredientParams } from '@renderer/app/services/ingredientsService/update';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { isEmoji } from '@renderer/app/utils/isEmoji';
import toast from '@renderer/app/utils/toast';

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

export type FormData = z.infer<typeof ingredientFormSchema>

export default function useEditIngredientModal(ingredientBeingEdited: Ingredient | null, onConfirm: () => void) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      icon: ingredientBeingEdited?.icon ?? '',
      name: capitalizeFirstLetter(ingredientBeingEdited?.name || ''),
    },
  });

  const {mutateAsync: updateIngredient, isPending: isLoading} = useMutation({
    mutationFn: async (data: UpdateIngredientParams) => ingredientsService.update(data),
    onSuccess: (updatedIngredient: Ingredient) => {
      queryClient.setQueryData(['ingredients', 'getAll'], (ingredients: Ingredient[]) => {

        return ingredients.map((ingredient) => ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient);
      });
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateIngredient({
        id: ingredientBeingEdited!.id,
        ...data,
      });

      toast({
        type: 'success',
        text: 'Ingrediente editado com sucesso.',
      });

      onConfirm();
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message;

        if (message) {
          toast({
            type: 'danger',
            text: message,
          });

          return;
        }

        toast({
          type: 'danger',
          text: 'Ocorreu um erro ao editar o ingrediente.',
        });
      }
    }
  });

  return {
    errors,
    isLoading,
    register,
    handleSubmit,
  };
}
