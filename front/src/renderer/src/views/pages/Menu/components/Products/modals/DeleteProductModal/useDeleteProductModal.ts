import { queryClient } from '@renderer/App';
import { Product } from '@renderer/app/entities/Product';
import { productsService } from '@renderer/app/services/productsService';
import { RemoveProductParams } from '@renderer/app/services/productsService/remove';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteProductModal(
  onDelete: () => void,
  productBeingDeleted: Product | null,
) {
  const { mutateAsync: removeProduct, isPending: isLoading } = useMutation({
    mutationFn: async (data: RemoveProductParams) => productsService.remove(data),
    onSuccess: () => {
      queryClient.setQueryData(['products', 'getAll'], (products: Product[]) => {
        return products.filter((product) => product.id !== productBeingDeleted!.id);
      });
    },
  });

  async function handleDeleteProduct() {
    try {
      await removeProduct({
        id: productBeingDeleted!.id,
      });
      toast({
        type: 'success',
        text: 'Produto removido.',
      });

      onDelete();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao remover produto',
      });
    }
  }

  return {
    isLoading,
    handleDeleteProduct,
  };
}
