import { incomesService } from '@renderer/app/services/dashboard/incomesService';

import { useQuery } from '@tanstack/react-query';

export function useIncomesQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['incomes', 'getAll'],
    queryFn: async () => incomesService.getAll(),
    staleTime: 30000,
  });

  return {
    incomes: data ?? { total: 0, history: {} },
    isLoading,
  };
}
