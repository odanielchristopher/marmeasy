import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IProductCategory } from '@app/entities/ProductCategories';
import { productCategoriesService } from '@app/services/productCategoriesService';

export function useRemoveProductCategory(id?: string) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: productCategoriesService.remove,
    onSuccess: () => {
      queryClient.setQueryData(
        ['product-categories'],
        (oldCategories: IProductCategory[]) =>
          oldCategories.filter((category) => category.id !== id),
      );
    },
  });

  return {
    removeCategory: mutateAsync,
    isLoading: isPending,
  };
}
