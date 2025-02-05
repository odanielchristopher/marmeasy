import { useCallback, useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function useDashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({ from: undefined });

  const handleSelectedDateRange = useCallback((value: DateRange) => {
    setSelectedDateRange(value);
  }, []);

  return {
    selectedDateRange,
    handleSelectedDateRange,
  };
}
