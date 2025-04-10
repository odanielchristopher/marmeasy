import { HandCoins, Plus, Soup } from 'lucide-react';

import { cn } from '@app/lib/utils';
import { Individual } from '@views/assets/icons/customers/options/Individual';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';

const fapItems = [
  {
    label: 'Novo cliente',
    icon: Individual,
    colorIcon: 'text-gray-800',
    bgIcon: 'bg-gray-200',
  },
  {
    label: 'Novo pedido',
    icon: Soup,
    colorIcon: 'text-primary-500',
    bgIcon: 'bg-primary-100',
  },
  {
    label: 'Novo pagamento',
    icon: HandCoins,
    colorIcon: 'text-teal-900',
    bgIcon: 'bg-teal-50',
  },
];

export function Fab() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="fixed bottom-4 right-4 text-white bg-teal-900 rounded-full p-3 outline-none"
        >
          <Plus className="size-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="!shadow-default space-y-2 px-2 py-2.5 border-transparent dark:border-muted max-md:dark:bg-muted"
      >
        {fapItems.map(({ label, icon: Icon, bgIcon, colorIcon }) => (
          <DropdownMenuItem key={label} className="cursor-pointer">
            <div
              className={cn(
                'flex items-center justify-center p-1.5 rounded-full',
                bgIcon,
              )}
            >
              <Icon className={cn('size-5', colorIcon)} />
            </div>

            <span className="text-sm text-gray-800 dark:text-foreground tracking-[-0.5px]">
              {label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
