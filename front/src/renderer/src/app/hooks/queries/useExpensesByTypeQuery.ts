import { expensesService } from '@renderer/app/services/dashboard/expensesService';

import { useQuery } from '@tanstack/react-query';

interface UseExpensesByTypeQueryParams {
  type: string;
  enabled?: boolean;
}

export function useExpensesByTypeQuery({
  type,
  enabled = true,
}: UseExpensesByTypeQueryParams) {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard', 'expenses', 'getAll', type],
    queryFn: async () => expensesService.getAll(type),
    enabled,
  });

  return {
    expenses: data ?? { total: 0, history: {} },
    isLoading: isFetching,
  };
}
