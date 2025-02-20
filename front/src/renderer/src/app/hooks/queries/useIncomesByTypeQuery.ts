import { incomesService } from '@renderer/app/services/dashboard/incomesService';

import { useQuery } from '@tanstack/react-query';

export function useIncomesByTypeQuery(enabled = true, type?: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard', 'incomes', 'getAll', type],
    queryFn: async () => incomesService.getAll(type),
    enabled,
  });

  return {
    incomes: data ?? { total: 0, history: {} },
    isLoading: isFetching,
  };
}
