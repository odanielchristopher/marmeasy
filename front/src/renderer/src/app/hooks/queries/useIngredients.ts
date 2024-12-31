import { useQuery } from '@tanstack/react-query';

import { ingredientsService } from '@renderer/app/services/ingredientsService';

export function useIngredients() {
  const { data, isLoading } = useQuery({
    queryKey: ['ingredients', 'getAll'],
    queryFn: async () => ingredientsService.getAll(),
    staleTime: 30000,
  });

  return {
    ingredients: data ?? [],
    isLoading,
  };
}
