import { dashboardIconsMap } from './dashboardIconsMap';

interface DashboardCategoryIconProps {
  type: 'income' | 'expense';
  icon?: string;
  size?: number;
}

export function DashboardCategoryIcon({
  type,
  icon,
  size,
}: DashboardCategoryIconProps) {
  const Icon =
    dashboardIconsMap[type][
      (icon as keyof (
        | typeof dashboardIconsMap.expense
        | typeof dashboardIconsMap.income
      )) ?? 'default'
    ] ?? dashboardIconsMap[type].default;

  return <Icon size={size}/>;
}
