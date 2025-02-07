import { salesService } from '@renderer/app/services/dashboard/salesService';

import { useQuery } from '@tanstack/react-query';

export function useSalesQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['sales', 'getAll'],
    queryFn: async () => salesService.getAll(),
    staleTime: 30000,
  });

  return {
    sales: data ?? { total: 0, history: {} },
    isLoading,
  };
}
