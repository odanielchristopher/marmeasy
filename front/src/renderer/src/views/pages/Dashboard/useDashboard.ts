import { DashboardContext } from '@renderer/app/contexts/DashboardContext';
import { useDashboarGraphQuery } from '@renderer/app/hooks/queries/useDashboarGraphQuery';
import { useContext } from 'react';

export default function useDashboard() {
  const { handleSelectedDateRange, selectedDateRange } =
    useContext(DashboardContext);

  const { labels, expenses, incomes, isLoading } = useDashboarGraphQuery();

  return {
    selectedDateRange,
    handleSelectedDateRange,
    labels,
    expenses,
    incomes,
    isLoading,
  };
}
