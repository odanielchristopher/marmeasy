import { DashboardContext } from '@renderer/app/contexts/DashboardContext';
import { useContext } from 'react';

export default function useDashboard() {
  const { handleSelectedDateRange, selectedDateRange } =
    useContext(DashboardContext);

  return {
    selectedDateRange,
    handleSelectedDateRange,
  };
}
