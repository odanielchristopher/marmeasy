import { useMutation } from '@tanstack/react-query';

import { productCategoriesService } from '@app/services/productCategoriesService';

export function useRemoveProductCategory() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: productCategoriesService.remove,
  });

  return {
    removeCategory: mutateAsync,
    isLoading: isPending,
  };
}
