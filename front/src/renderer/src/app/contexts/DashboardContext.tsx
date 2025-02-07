import { createContext, useCallback, useState } from 'react';
import { DateRange } from 'react-day-picker';

export interface DashboardContextType {
  selectedDateRange: DateRange;
  handleSelectedDateRange: (value: DateRange) => void;
}

export const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType,
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    from: undefined,
  });

  const handleSelectedDateRange = useCallback(
    (value: DateRange) => {
      setSelectedDateRange(value);
      setDashboardState(value);
    },
    [setDashboardState],
  );

  return (
    <DashboardContext.Provider
      value={{ selectedDateRange, handleSelectedDateRange }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

let dashboardState: DateRange = { from: undefined, to: undefined };

export function setDashboardState(newState: DateRange) {
  dashboardState = newState;
}

export function getDashboardState(): DateRange {
  return dashboardState;
}
