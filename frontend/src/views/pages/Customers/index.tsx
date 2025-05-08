import { UsersIcon } from 'lucide-react';
import { Link } from 'react-router';

import { useCustomers } from '@app/hooks/useCustomers';
import { cn } from '@app/lib/utils';
import { routes } from '@app/Router/routes';
import { FilterIcon } from '@views/assets/icons/FilterIcon';
import { PageHeader } from '@views/components/app/PageHeader';
import { Button } from '@views/components/ui/Button';
import { InputSearch } from '@views/components/ui/InputSearch';
import { Skeleton } from '@views/components/ui/Skeleton';
import { Spinner } from '@views/components/ui/Spinner';

import { CustomerCard } from './components/CustomerCard';
import { FiltersModal } from './components/FiltersModal';
import { useCustomersController } from './useCustomersController';

export function Customers() {
  const {
    customers,
    isLoading,
    spinnerRef,
    isFetchingNextPage,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
  } = useCustomersController({
    loadCustomers: useCustomers,
  });

  return (
    <div className="h-full pt-7 px-4 md:px-6 flex-1 flex flex-col">
      {isFiltersModalOpen && (
        <FiltersModal
          open={isFiltersModalOpen}
          onClose={handleCloseFiltersModal}
        />
      )}

      <PageHeader
        title="Clientes"
        description="Gerencie os clientes do seu estabelecimento"
        icon={UsersIcon}
      />

      <main className="mt-8 flex flex-col flex-1">
        <div className="flex gap-4 h-[52px] items-center">
          <InputSearch placeholder="Encontre o cliente pelo nome" />

          <Button
            variant="outline"
            type="button"
            className="bg-white"
            onClick={handleOpenFiltersModal}
          >
            <FilterIcon className="text-gray-800 dark:text-foreground" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col justify-between gap-4 pb-4 md:pb-6">
          <div className="mt-7 grid items-start gap-4 grid-cols-1 min-[510px]:grid-cols-2 lg:grid-cols-4">
            {isLoading && (
              <>
                <Skeleton className="min-h-44" />
                <Skeleton className="min-h-44" />
                <Skeleton className="min-h-44" />
                <Skeleton className="min-h-44" />
                <Skeleton className="min-h-44" />
                <Skeleton className="min-h-44" />
                <Skeleton className="min-h-44" />
                <Skeleton className="min-h-44" />
              </>
            )}

            {!isLoading &&
              customers.map((customer) => (
                <Link
                  key={customer.id}
                  to={`${routes.customers}/${customer.id}`}
                  className="rounded-md"
                >
                  <CustomerCard customer={customer} />
                </Link>
              ))}
          </div>

          <div
            className={cn(
              'w-full grid place-items-center',
              !isFetchingNextPage && 'size-0',
            )}
            ref={spinnerRef}
          >
            <Spinner className={cn(!isFetchingNextPage && 'size-0')} />
          </div>
        </div>
      </main>
    </div>
  );
}
