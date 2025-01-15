import { useMutation } from '@tanstack/react-query';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import { productCategoriesService } from '@renderer/app/services/productCategoriesService';
import { RemoveProductCategoryParams } from '@renderer/app/services/productCategoriesService/remove';

import { queryClient } from '@renderer/App';
import toast from '@renderer/app/utils/toast';

export default function useDeleteIngredientModal(ingredientBeingDeleted: Ingredient | null, onCofirm: () => void) {
  const { mutateAsync: removeCategory, isPending: isloading } = useMutation({
    mutationFn: async (data: RemoveProductCategoryParams) => productCategoriesService.remove(data),
    onSuccess: () => {
      queryClient.setQueryData(['product-categories', 'getAll'], (categories: Ingredient[]) => {
        return categories.filter((category) => category.id !== ingredientBeingDeleted!.id);
      });

      queryClient.refetchQueries({
        queryKey: ['products', 'getAll'],
        exact: true,
      });
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
