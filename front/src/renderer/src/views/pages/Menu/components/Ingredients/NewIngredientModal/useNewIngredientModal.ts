import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { queryClient } from '@renderer/App';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { ingredientsService } from '@renderer/app/services/ingredientsService';
import { CreateIngredientParams } from '@renderer/app/services/ingredientsService/create';
import { IngredientFormData } from '../IngredientForm/useIngredientForm';

import toast from '@renderer/app/utils/toast';

export default function useNewIngredientModal(onSuccess: () => void) {

  const { mutateAsync: createIngredient, isPending: isLoading } = useMutation({
    mutationFn: (data: CreateIngredientParams) => ingredientsService.create(data),
    onSuccess: (newIngredient: Ingredient) => {
      queryClient.setQueryData(
        ['ingredients', 'getAll'],
        (ingredients: Ingredient[]) => [...ingredients, newIngredient],
      );
    },
  });


  async function handleSubmit(data: IngredientFormData) {
    try {
      await createIngredient(data);
      toast({
        type: 'success',
        text: 'Categoria criada com sucesso.',
      });
      onSuccess();
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
          text: 'Ocorreu um erro ao criar categoria.',
        });
      }
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}
