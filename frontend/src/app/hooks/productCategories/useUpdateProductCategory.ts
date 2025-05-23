import { useMutation } from '@tanstack/react-query';

import { productCategoriesService } from '@app/services/productCategoriesService';

export function useUpdateProductCategory() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: productCategoriesService.update,
  });

  return {
    updateCategory: mutateAsync,
    isLoading: isPending,
  };
}
