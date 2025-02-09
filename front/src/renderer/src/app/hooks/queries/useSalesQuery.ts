import { salesService } from '@renderer/app/services/dashboard/salesService';

import { useQuery } from '@tanstack/react-query';

export function useSalesQuery() {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard', 'sales', 'getAll'],
    queryFn: async () => salesService.getAll(),
  });

  return {
    sales: data ?? { total: 0, history: {} },
    isLoading: isFetching,
  };
}
