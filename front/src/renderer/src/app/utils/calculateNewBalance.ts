export interface CalculateNewBalanceParams {
  currentBalance: number;
  previousValue?: number;
  newValue: number;
}

export function calculateNewBalance({
  currentBalance,
  newValue,
  previousValue,
}: CalculateNewBalanceParams): number {
  return currentBalance - (previousValue || 0) + newValue;
}
