import { incomesService } from '@renderer/app/services/dashboard/incomesService';

import { useQuery } from '@tanstack/react-query';

export function useIncomesQuery() {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard', 'incomes', 'getAll'],
    queryFn: async () => incomesService.getAll(),
  });

  return {
    incomes: data ?? { total: 0, history: [] },
    isLoading: isFetching,
  };
}
