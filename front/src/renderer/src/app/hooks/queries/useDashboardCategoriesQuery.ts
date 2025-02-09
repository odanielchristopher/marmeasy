import { useQuery } from '@tanstack/react-query';

import { dashboardCategoriesService } from '@renderer/app/services/dashboard/dashboardCategoriesService';

export function useDashboardCategoriesQuery() {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard', 'dashboardCategories', 'getAll'],
    queryFn: async () => dashboardCategoriesService.getAll(),
  });

  return {
    categories: data ?? { expenses: [], incomes: [] },
    isLoading: isFetching,
  };
}
