import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IProduct } from '@app/entities/Product';
import { productsService } from '@app/services/productsService';

export function useRemoveProduct(id: string) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: productsService.remove,
    onSuccess: () => {
      queryClient.setQueryData(['products'], (oldProducts: IProduct[]) =>
        oldProducts.filter((product) => product.id !== id),
      );
    },
  });

  return {
    removeProduct: mutateAsync,
    isLoading: isPending,
  };
}
