import { HandCoinsIcon, Plus, SoupIcon } from 'lucide-react';
import { Link } from 'react-router';
import { useShallow } from 'zustand/shallow';

import { cn } from '@app/lib/utils';
import { routes } from '@app/Router/routes';
import { useGlobalStore } from '@app/store';
import { Store } from '@app/store/Store';
import { Individual } from '@views/assets/icons/customers/options/Individual';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';

const selectGlobalModals = (store: Store) => ({
  openNewCustomerModal: store.globalModals.openNewCustomerModal,
  openNewPaymentModal: store.globalModals.openNewPaymentModal,
});

export function Fab() {
  const globalModals = useGlobalStore(useShallow(selectGlobalModals));

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 text-white bg-teal-900 dark:bg-primary transition-colors rounded-full p-3 outline-none"
        >
          <Plus className="size-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="!shadow-default space-y-2 px-2 py-2.5 bg-white dark:bg-popover border-transparent dark:border-accent"
      >
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => globalModals.openNewCustomerModal()}
        >
          <div
            className={cn(
              'flex items-center justify-center p-1.5 rounded-full',
              'bg-gray-200',
            )}
          >
            <Individual className={cn('size-5', 'text-gray-800')} />
          </div>

          <span className="text-sm text-gray-800 dark:text-foreground tracking-[-0.5px]">
            Novo cliente
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to={routes.newOrder}>
            <div
              className={cn(
                'flex items-center justify-center p-1.5 rounded-full',
                'bg-primary-100',
              )}
            >
              <SoupIcon className={cn('size-5', 'text-primary-500')} />
            </div>

            <span className="text-sm text-gray-800 dark:text-foreground tracking-[-0.5px]">
              Novo pedido
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => globalModals.openNewPaymentModal()}
        >
          <div
            className={cn(
              'flex items-center justify-center p-1.5 rounded-full',
              'bg-teal-50',
            )}
          >
            <HandCoinsIcon className={cn('size-5', 'text-teal-900')} />
          </div>

          <span className="text-sm text-gray-800 dark:text-foreground tracking-[-0.5px]">
            Novo pagamento
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
