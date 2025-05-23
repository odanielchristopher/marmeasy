import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IProductCategory } from '@app/entities/ProductCategories';
import { productCategoriesService } from '@app/services/productCategoriesService';

export function useUpdateProductCategory() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: productCategoriesService.update,
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(
        ['product-categories'],
        (oldCategories: IProductCategory[]) =>
          oldCategories.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category,
          ),
      );
    },
  });

  return {
    updateCategory: mutateAsync,
    isLoading: isPending,
  };
}
