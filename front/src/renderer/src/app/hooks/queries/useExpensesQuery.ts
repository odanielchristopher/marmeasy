import { expensesService } from '@renderer/app/services/dashboard/expensesService';

import { useQuery } from '@tanstack/react-query';

export function useExpensesQuery(type?: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard', 'expenses', 'getAll'],
    queryFn: async () => expensesService.getAll(type),
  });

  return {
    expenses: data ?? { total: 0, history: {} },
    isLoading: isFetching,
  };
}
