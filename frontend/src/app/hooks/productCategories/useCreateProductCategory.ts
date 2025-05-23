import { useMutation } from '@tanstack/react-query';

import { productCategoriesService } from '@app/services/productCategoriesService';

export function useCreateProductCategory() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: productCategoriesService.create,
  });

  return {
    createCategory: mutateAsync,
    isLoading: isPending,
  };
}
