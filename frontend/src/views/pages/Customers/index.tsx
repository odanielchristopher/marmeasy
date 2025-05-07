import { UsersIcon } from 'lucide-react';
import { Link } from 'react-router';

import { useCustomers } from '@app/hooks/useCustomers';
import { routes } from '@app/Router/routes';
import { FilterIcon } from '@views/assets/icons/FilterIcon';
import { PageHeader } from '@views/components/app/PageHeader';
import { Pagination } from '@views/components/app/Pagination';
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
    pagination,
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

        <div className="flex-1 flex flex-col justify-between pb-4 md:pb-6">
          <div className="mt-7 grid items-start gap-4 grid-cols-1 min-[510px]:grid-cols-2 lg:grid-cols-4 pb-6">
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
              customers.data.map((customer) => (
                <Link
                  key={customer.id}
                  to={`${routes.customers}/${customer.id}`}
                  className="rounded-md"
                >
                  <CustomerCard customer={customer} />
                </Link>
              ))}
          </div>

          <Pagination pagination={pagination} />
        </div>
      </main>
    </div>
  );
}
