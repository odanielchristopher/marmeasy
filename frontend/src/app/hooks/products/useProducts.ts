import { useQuery } from '@tanstack/react-query';

import { productsService } from '@app/services/productsService';

export function useProducts(params?: { search?: string; category?: string }) {
  const { data, isLoading } = useQuery({
    queryKey: [
      'products',
      { search: params?.search, category: params?.category },
    ],
    queryFn: () => productsService.getAll(params),
    staleTime: Infinity,
  });

  return {
    products: data ?? [],
    isLoading,
  };
}
