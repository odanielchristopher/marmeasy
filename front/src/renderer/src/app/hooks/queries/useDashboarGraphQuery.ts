import { useQuery } from '@tanstack/react-query';

import { dashboardGraphService } from '@renderer/app/services/dashboard/graphService';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function useDashboarGraphQuery() {
  const { data, isFetching } = useQuery({
    queryKey: ['dashboard', 'dashboardGraph', 'getAll'],
    queryFn: async () => dashboardGraphService.getAll(),
  });

  const dataMap = new Map<string, { income: number; expense: number }>();

  data?.incomes.forEach((income) => {
    const date = format(parseISO(income.date), 'd MMM', { locale: ptBR });
    const current = dataMap.get(date) || { income: 0, expense: 0 };

    dataMap.set(date, { ...current, income: current.income + income.value });
  });

  data?.expenses.forEach((expense) => {
    const date = format(parseISO(expense.date), 'd MMM', { locale: ptBR });
    const current = dataMap.get(date) || { income: 0, expense: 0 };

    dataMap.set(date, { ...current, expense: current.expense + expense.value });
  });

  const sortedEntries = Array.from(dataMap.entries()).sort(
    ([dateA], [dateB]) =>
      parseInt(dateA.split(' ')[0]) - parseInt(dateB.split(' ')[0]),
  );

  const labels = sortedEntries.map(([date]) => date);
  const incomes = sortedEntries.map(([, data]) => data.income);
  const expenses = sortedEntries.map(([, data]) => data.expense);

  return {
    isLoading: isFetching,
    labels: labels || [],
    incomes: incomes || [],
    expenses: expenses || [],
  };
}
