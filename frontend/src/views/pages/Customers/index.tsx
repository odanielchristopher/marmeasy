import { UsersIcon } from 'lucide-react';
import { Link } from 'react-router';

import { useCustomers } from '@app/hooks/useCustomers';
import { routes } from '@app/Router/routes';
import { FilterIcon } from '@views/assets/icons/FilterIcon';
import { PageHeader } from '@views/components/app/PageHeader';
import { Button } from '@views/components/ui/Button';
import { InputSearch } from '@views/components/ui/InputSearch';
import { Skeleton } from '@views/components/ui/Skeleton';

import { CustomerCard } from './components/CustomerCard';
import { FiltersModal } from './components/FiltersModal';
import { useCustomersController } from './useCustomersController';

export function Customers() {
  const {
    customers,
    isLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
  } = useCustomersController({
    loadCustomers: useCustomers,
  });

  return (
    <div className="h-full pt-7 px-4 md:px-6">
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

      <main className="mt-8">
        <div className="flex gap-4 h-[52px] items-center">
          <InputSearch placeholder="Encontre o cliente pelo nome" />

          <Button
            variant="outline"
            className="bg-white"
            onClick={handleOpenFiltersModal}
          >
            <FilterIcon className="text-gray-800 dark:text-foreground" />
          </Button>
        </div>

        <div className="mt-7 grid gap-4 grid-cols-1 min-[510px]:grid-cols-2 lg:grid-cols-4 pb-6">
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
                to={`${routes.customer}/${customer.id}`}
                className="rounded-md"
              >
                <CustomerCard customer={customer} />
              </Link>
            ))}
        </div>
      </main>
    </div>
  );
}
