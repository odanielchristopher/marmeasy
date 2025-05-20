import { useQuery } from '@tanstack/react-query';

import { productCategoriesService } from '@app/services/productCategoriesService';

export function useProductCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ['product-categories'],
    queryFn: productCategoriesService.getAll,
  });

  return {
    categories: data ?? [],
    isLoading,
  };
}
