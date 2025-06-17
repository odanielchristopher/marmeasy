import { UsersIcon } from 'lucide-react';
import { Link } from 'react-router';

import { useCustomers } from '@app/hooks/customers/useCustomers';
import { routes } from '@app/Router/routes';
import { FilterIcon } from '@views/assets/icons/FilterIcon';
import { InfiniteScrollContainer } from '@views/components/app/InfiniteScrollContainer';
import { NotFoundError } from '@views/components/app/NotFoundError';
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
    hasCustomers,
    infiniteScroll,
    isFiltersModalOpen,
    searchCustomerTerm,
    handleSearchCustomerTerm,
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
          <InputSearch
            placeholder="Quem você está procurando?"
            value={searchCustomerTerm}
            className="max-w-[600px]"
            onSearch={(data) => handleSearchCustomerTerm(data)}
          />

          <Button
            variant="outline"
            type="button"
            onClick={handleOpenFiltersModal}
          >
            <FilterIcon className="text-gray-800 dark:text-foreground" />
          </Button>
        </div>

        <InfiniteScrollContainer
          isLoading={isLoading}
          infiniteScroll={infiniteScroll}
        >
          <div className="flex-1 flex flex-col justify-between gap-4 pb-4 md:pb-6">
            {!isLoading && !hasCustomers && (
              <NotFoundError message="Não encontramos nenhum cliente!" />
            )}

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
                hasCustomers &&
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
          </div>
        </InfiniteScrollContainer>
      </main>
    </div>
  );
}
