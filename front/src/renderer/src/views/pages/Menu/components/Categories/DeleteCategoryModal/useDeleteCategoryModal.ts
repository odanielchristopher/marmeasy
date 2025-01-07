import { queryClient } from '@renderer/App';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { productCategoriesService } from '@renderer/app/services/productCategoriesService';
import { RemoveProductCategoryParams } from '@renderer/app/services/productCategoriesService/remove';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteCategoryModal(categoryBeingDeleted: ProductCategory | null, onCofirm: () => void) {
  const { mutateAsync: removeCategory, isPending: isloading } = useMutation({
    mutationFn: async (data: RemoveProductCategoryParams) => productCategoriesService.remove(data),
    onSuccess: () => {
      queryClient.setQueryData(['product-categories', 'getAll'], (categories: ProductCategory[]) => {
        return categories.filter((category) => category.id !== categoryBeingDeleted!.id);
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
        id: categoryBeingDeleted!.id,
      });
      toast({
        type: 'success',
        text: 'Categoria removida com sucesso.',
      });
      onCofirm();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao remover a categoria.',
      });
    }
  }

  return {
    handleConfirm,
    isloading,
  };
}
