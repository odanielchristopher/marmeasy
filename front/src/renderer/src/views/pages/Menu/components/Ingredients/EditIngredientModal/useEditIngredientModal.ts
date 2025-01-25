import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { queryClient } from '@renderer/App';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { ingredientsService } from '@renderer/app/services/ingredientsService';
import { UpdateIngredientParams } from '@renderer/app/services/ingredientsService/update';
import { IngredientFormData } from '../IngredientForm/useIngredientForm';

import toast from '@renderer/app/utils/toast';

interface UseEditIngredientModalProps {
  ingredientBeingEdited: Ingredient | null
  onSuccess?(): void
}

export default function useEditIngredientModal({
  ingredientBeingEdited,
  onSuccess,
}: UseEditIngredientModalProps) {
  const {mutateAsync: updateIngredient, isPending: isLoading} = useMutation({
    mutationFn: async (data: UpdateIngredientParams) => ingredientsService.update(data),
    onSuccess: (updatedIngredient: Ingredient) => {
      queryClient.setQueryData(['ingredients', 'getAll'], (ingredients: Ingredient[]) => {

        return ingredients.map((ingredient) => ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient);
      });
    },
  });

  async function handleSubmit(data: IngredientFormData) {
    try {
      await updateIngredient({
        id: ingredientBeingEdited!.id,
        ...data,
      });

      toast({
        type: 'success',
        text: 'Ingrediente editado com sucesso.',
      });
      onSuccess?.();
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
  }

  return {
    isLoading,
    handleSubmit,
  };
}
