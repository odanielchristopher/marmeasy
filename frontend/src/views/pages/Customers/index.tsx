import { UsersIcon } from 'lucide-react';
import { Link } from 'react-router';

import { routes } from '@app/Router/routes';
import { FilterIcon } from '@views/assets/icons/FilterIcon';
import { PageHeader } from '@views/components/app/PageHeader';
import { Button } from '@views/components/ui/Button';
import { InputSearch } from '@views/components/ui/InputSearch';

import { CustomerCard } from './components/CustomerCard';
import { FiltersModal } from './components/FiltersModal';
import { useCustomerController } from './useCustomersController';

export function Customers() {
  const {
    customers,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
  } = useCustomerController();

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
          {customers.map((customer) => (
            <Link key={customer.id} to={`${routes.customer}/${customer.id}`}>
              <CustomerCard customer={customer} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
