import { productCategoriesService } from '@renderer/app/services/productCategoriesService';
import { useQuery } from '@tanstack/react-query';

export function useProductCategoriesQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['product-categories', 'getAll'],
    queryFn: async () => productCategoriesService.getAll(),
    staleTime: 60000,
  });

  return {
    categories: data ?? [],
    isLoading,
  };
}
