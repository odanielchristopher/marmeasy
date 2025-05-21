import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IProduct } from '@app/entities/Product';
import { productsService } from '@app/services/productsService';

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: productsService.update,
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(['products'], (oldProducts: IProduct[]) =>
        oldProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        ),
      );
    },
  });

  return {
    updateProduct: mutateAsync,
    isLoading: isPending,
  };
}
