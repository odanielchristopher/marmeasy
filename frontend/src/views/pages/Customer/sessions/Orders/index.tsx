import {
  ArrowDownWideNarrowIcon,
  ArrowUpNarrowWideIcon,
  FileDownIcon,
  SoupIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router';

import { routes } from '@app/Router/routes';
import { formatCurrency } from '@app/utils/formatCurrency';
import { DateRangePickerInput } from '@views/components/app/DateRangePickerInput';
import { InfiniteScrollContainer } from '@views/components/app/InfiniteScrollContainer';
import { NotFoundError } from '@views/components/app/NotFoundError';
import { OrderCard } from '@views/components/app/OrderCard';
import { RemoveModal } from '@views/components/app/RemoveModal';
import { SortOrderToggle } from '@views/components/app/SortOrderToggle';
import { Button } from '@views/components/ui/Button';
import { Skeleton } from '@views/components/ui/Skeleton';

import { useOrdersSessionController } from './useOrdersSessionController';

interface IOrdersSessionProps {
  customer: {
    id: string;
    name: string;
  };
}

export function OrdersSession({ customer: { id, name } }: IOrdersSessionProps) {
  const navigate = useNavigate();
  const {
    infiniteScroll,
    isLoading,
    orders,
    amount,
    renderOrder,
    hasOrders,
    isRemoving,
    isRemoveOrderModalOpen,
    handleGeneratePdf,
    handleCloseRemoveOrderModal,
    handleOpenRemoveOrderModal,
    handleRenderOrder,
    handleDateRange,
    handleConfirmRemoveOrder,
  } = useOrdersSessionController(id, name);

  return (
    <>
      {isRemoveOrderModalOpen && (
        <RemoveModal
          open
          onClose={handleCloseRemoveOrderModal}
          onConfirm={handleConfirmRemoveOrder}
          isLoading={isRemoving}
          warn="Tem certeza que deseja apagar esse pedido?"
        />
      )}
      <header className="flex gap-3 items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="flex items-center justify-center p-3 border border-gray-300 dark:border-accent bg-white dark:bg-card rounded-sm">
            <SoupIcon />
          </div>
          <h4 className="text-xl font-medium tracking-[-0.5px]">Pedidos</h4>
        </div>

        <div className="flex gap-3 items-center pr-4">
          <span className="text-xs">Total:</span>
          {isLoading && !hasOrders && <Skeleton className="h-10 w-20" />}

          {!isLoading && (
            <strong className="text-base text-teal-800 dark:text-teal-900 tracking-[-0.5px]">
              {formatCurrency(amount)}
            </strong>
          )}
        </div>
      </header>

      <div className="flex justify-between gap-4 items-center mt-6 flex-wrap">
        <div className="flex items-center gap-4">
          <DateRangePickerInput className="w-60" onChange={handleDateRange} />

          <Button
            type="button"
            onClick={handleGeneratePdf}
            variant="outline"
            className="size-[52px]"
          >
            <FileDownIcon className="size-6 stroke-[1.5]" />
          </Button>
        </div>

        <SortOrderToggle
          value={renderOrder}
          options={[
            {
              icon: ArrowUpNarrowWideIcon,
              value: 'desc',
              label: 'Mais recente',
            },
            {
              icon: ArrowDownWideNarrowIcon,
              value: 'asc',
              label: 'Mais antiga',
            },
          ]}
          onChange={handleRenderOrder}
        />
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
              message="Não encontramos nenhum pedido para esse cliente!"
              classNames={{
                root: 'mt-10',
                message: 'max-w-[300px] text-center',
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
                  onEdit={() => navigate(`${routes.orders}/edit/${order.id}`)}
                  onRemove={() => handleOpenRemoveOrderModal(order)}
                />
              ))}
          </div>
        </div>
      </InfiniteScrollContainer>
    </>
  );
}
