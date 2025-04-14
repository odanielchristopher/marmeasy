import {
  ChartBarIncreasingIcon,
  NotebookTextIcon,
  ReceiptTextIcon,
  UsersIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';

import { cn } from '@app/lib/utils';
import { routes } from '@app/Router/routes';

export const navItems = [
  {
    label: 'Clientes',
    pathname: routes.customers,
    icon: UsersIcon,
  },
  {
    label: 'Pedidos',
    pathname: routes.orders,
    icon: ReceiptTextIcon,
  },
  {
    label: 'Cardápio',
    pathname: routes.menu,
    icon: NotebookTextIcon,
  },
  {
    label: 'Relatórios',
    pathname: routes.dashboard,
    icon: ChartBarIncreasingIcon,
  },
];

export function AppNavigation() {
  const { pathname: currentPathname } = useLocation();

  return (
    <nav className="hidden md:flex gap-2.5">
      {navItems.map(({ label, pathname, icon: Icon }) => (
        <Link
          key={pathname}
          className={cn(
            '!border border-transparent px-3 py-1.5 rounded-full text-white text-sm tracking-[-0.5px] flex items-center gap-2 hover:bg-[#DEE2E6]/20 hover:border-[#DEE2E6]/20',
            currentPathname === pathname &&
              'border !border-white bg-[#DEE2E6]/20',
          )}
          to={pathname}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
