import { createContext, useCallback, useState } from 'react';
import { DateRange } from 'react-day-picker';

export interface DashboardContextType {
  selectedDateRange: DateRange;
  selectedOptionRange: string;
  handleSelectedOptionRange(value: string): void;
  handleSelectedDateRange(value: DateRange): void;
}

export const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType,
);

export type OptionPeriodType = 'QUINZENA' | 'MENSAL' | '';

const DEFAULT_OPTION: OptionPeriodType = 'QUINZENA';

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    from: undefined,
  });
  const [selectedOptionRange, setSelectedOptionRange] =
    useState<OptionPeriodType>(DEFAULT_OPTION);

  const handleSelectedOptionRange = useCallback((value: OptionPeriodType) => {
    setSelectedOptionRange(value || DEFAULT_OPTION);
  }, []);

  const handleSelectedDateRange = useCallback(
    (value: DateRange) => {
      setSelectedDateRange(value);
      setDashboardState(value);

      setSelectedOptionRange((prev) => {
        if (!value.from) return DEFAULT_OPTION;
        if (prev) return '';
        return prev;
      });
    },
    [selectedOptionRange],
  );

  return (
    <DashboardContext.Provider
      value={{
        selectedDateRange,
        selectedOptionRange,
        handleSelectedDateRange,
        handleSelectedOptionRange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

// Variável para o range ser acessado fora do provider
let dashboardState: DateRange | null = null;

export function setDashboardState(newState: DateRange) {
  dashboardState = newState;
}

export function getDashboardState(): DateRange | null {
  return dashboardState;
}
