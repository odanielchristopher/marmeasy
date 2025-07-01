import { NotebookTextIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import { routes } from '@app/Router/routes';
import { CustomerIcon } from '@views/assets/icons/customers/CustomerIcon';
import { FilterIcon } from '@views/assets/icons/FilterIcon';
import { Aside } from '@views/components/app/Aside';
import { InfiniteScrollContainer } from '@views/components/app/InfiniteScrollContainer';
import { NotFoundError } from '@views/components/app/NotFoundError';
import { OrderCard } from '@views/components/app/OrderCard';
import { PageHeader } from '@views/components/app/PageHeader';
import { RemoveModal } from '@views/components/app/RemoveModal';
import { Button } from '@views/components/ui/Button';
import { InputSearch } from '@views/components/ui/InputSearch';
import { Skeleton } from '@views/components/ui/Skeleton';

import { FiltersModal } from './components/FiltersModal';
import { useOrdersController } from './useOrdersController';

export function Orders() {
  const navigate = useNavigate();
  const {
    orders,
    hasOrders,
    isLoading,
    customerType,
    infiniteScroll,
    isRemoveOrderModalOpen,
    isFiltersModalOpen,
    handleApplyFilters,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleSearchTerm,
    handleCustomerType,
    handleOpenRemoveOrderModal,
    handleCloseRemoveOrderModal,
    isRemoving,
    handleConfirmRemoveOrder,
  } = useOrdersController();

  return (
    <div className="h-full pt-7 px-4 md:px-6">
      {isRemoveOrderModalOpen && (
        <RemoveModal
          open
          onClose={handleCloseRemoveOrderModal}
          onConfirm={handleConfirmRemoveOrder}
          isLoading={isRemoving}
          warn="Tem certeza que deseja apagar esse pedido?"
        />
      )}
      <FiltersModal
        open={isFiltersModalOpen}
        onClose={handleCloseFiltersModal}
        onApplyFilters={handleApplyFilters}
      />

      <PageHeader
        title="Pedidos"
        description="Organize os produtos do seu estabelecimento"
        icon={NotebookTextIcon}
      />

      <main className="w-full pb-6 flex gap-4 md:gap-0 pt-11 md:pt-8 max-md:flex-col">
        <Aside
          title="Categorias"
          currentOption={customerType.value}
          options={[
            {
              id: 'ALL',
              icon: CustomerIcon,
              iconType: 'default',
              label: 'Todos os clientes',
              handler: () =>
                handleCustomerType({
                  value: 'ALL',
                  label: 'Todos os clientes',
                }),
            },
            {
              id: 'INDIVIDUAL',
              icon: CustomerIcon,
              iconType: 'individual',
              label: 'Clientes físicos',
              handler: () =>
                handleCustomerType({
                  value: 'INDIVIDUAL',
                  label: 'Clientes físicos',
                }),
            },
            {
              id: 'BUSINESS',
              icon: CustomerIcon,
              iconType: 'business',
              label: 'Clientes jurídicos',
              handler: () =>
                handleCustomerType({
                  value: 'BUSINESS',
                  label: 'Clientes jurídicos',
                }),
            },
          ]}
          classNames={{
            icon: 'size-6 stroke-2 dark:text-foreground',
          }}
        />

        <div className="mb-5 md:pl-8 flex-1">
          <header className="flex gap-3 items-center">
            <div className="flex items-center justify-center p-3 border border-gray-300 dark:border-accent bg-white dark:bg-card rounded-sm">
              <CustomerIcon
                type={customerType.value.toLowerCase()}
                className="stroke-2 text-gray-800 dark:text-foreground"
              />
            </div>
            <h4 className="text-xl text-gray-800 dark:text-foreground font-medium tracking-[-0.5px]">
              {customerType.label}
            </h4>
          </header>

          <div className="mt-6 flex gap-4 h-[52px] items-center">
            <InputSearch
              placeholder="Quem você está procurando?"
              className="w-full max-w-[500px]"
              onSearch={(data) => handleSearchTerm(data.searchTerm)}
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
              {!isLoading && !hasOrders && (
                <NotFoundError
                  image={{
                    type: 'order',
                    alt: 'Sem pedidos encontrados!',
                  }}
                  message="Não encontramos nenhum pedido!"
                  classNames={{
                    root: 'mt-10',
                  }}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 mt-5.5">
                {isLoading && (
                  <>
                    <Skeleton className="min-h-19 rounded-xl" />
                    <Skeleton className="min-h-19 rounded-xl" />
                    <Skeleton className="min-h-19 rounded-xl" />
                    <Skeleton className="min-h-19 rounded-xl" />
                    <Skeleton className="min-h-19 rounded-xl" />
                    <Skeleton className="min-h-19 rounded-xl" />
                  </>
                )}

                {!isLoading &&
                  hasOrders &&
                  orders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onEdit={() =>
                        navigate(`${routes.orders}/edit/${order.id}`)
                      }
                      onRemove={() => handleOpenRemoveOrderModal(order)}
                    />
                  ))}
              </div>
            </div>
          </InfiniteScrollContainer>
        </div>
      </main>
    </div>
  );
}
