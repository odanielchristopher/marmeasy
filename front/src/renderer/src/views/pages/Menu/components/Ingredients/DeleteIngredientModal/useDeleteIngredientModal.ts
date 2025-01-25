import { useMutation } from '@tanstack/react-query';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import { ingredientsService } from '@renderer/app/services/ingredientsService';
import { RemoveIngredientParams } from '@renderer/app/services/ingredientsService/remove';

import { queryClient } from '@renderer/App';
import toast from '@renderer/app/utils/toast';

export default function useDeleteIngredientModal(
  ingredientBeingDeleted: Ingredient | null,
  onCofirm: () => void,
) {
  const { mutateAsync: removeCategory, isPending: isloading } = useMutation({
    mutationFn: async (data: RemoveIngredientParams) =>
      ingredientsService.remove(data),
    onSuccess: () => {
      queryClient.setQueryData(
        ['ingredients', 'getAll'],
        (ingredients: Ingredient[]) => {
          return ingredients.filter(
            (ingredient) => ingredient.id !== ingredientBeingDeleted!.id,
          );
        },
      );
    },
  });

  async function handleConfirm() {
    try {
      await removeCategory({
        id: ingredientBeingDeleted!.id,
      });
      toast({
        type: 'success',
        text: 'Ingrediente removido com sucesso.',
      });
      onCofirm();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao remover o ingrediente.',
      });
    }
  }

  return {
    handleConfirm,
    isloading,
  };
}
