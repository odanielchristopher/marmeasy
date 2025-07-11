import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IProduct } from '@app/entities/Product';
import { productsService } from '@app/services/productsService';

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: productsService.create,
    onSuccess: (newProduct) => {
      queryClient.setQueriesData(
        {
          queryKey: ['products'],
        },
        (oldProducts: IProduct[]) => [...oldProducts, newProduct],
      );

      queryClient.invalidateQueries({
        queryKey: ['products'],
        refetchType: 'all',
      });
    },
  });

  return {
    createProduct: mutateAsync,
    isLoading: isPending,
  };
}
