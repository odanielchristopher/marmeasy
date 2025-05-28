import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IProductCategory } from '@app/entities/ProductCategories';
import { productCategoriesService } from '@app/services/productCategoriesService';

export function useCreateProductCategory() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: productCategoriesService.create,
    onSuccess: (category) => {
      queryClient.setQueryData(
        ['product-categories'],
        (oldCategories: IProductCategory[]) => [...oldCategories, category],
      );

      queryClient.invalidateQueries({
        queryKey: ['product-categories'],
      });
    },
  });

  return {
    createCategory: mutateAsync,
    isLoading: isPending,
  };
}
