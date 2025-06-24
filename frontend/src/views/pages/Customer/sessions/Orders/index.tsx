import { SoupIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import { routes } from '@app/Router/routes';
import { DateRangePickerInput } from '@views/components/app/DateRangePickerInput';
import { InfiniteScrollContainer } from '@views/components/app/InfiniteScrollContainer';
import { NotFoundError } from '@views/components/app/NotFoundError';
import { OrderCard } from '@views/components/app/OrderCard';
import { Skeleton } from '@views/components/ui/Skeleton';

import { ToggleGroup } from '../../components/ToggleGroup';

import { useOrdersSessionController } from './useOrdersSessionController';

interface IOrdersSessionProps {
  customerId: string;
}

export function OrdersSession({ customerId }: IOrdersSessionProps) {
  const navigate = useNavigate();
  const {
    infiniteScroll,
    isLoading,
    orders,
    hasOrders,
    handleRenderOrder,
    handleDateRange,
  } = useOrdersSessionController(customerId);

  return (
    <>
      <header className="flex gap-3 items-center">
        <div className="flex items-center justify-center p-3 border border-gray-300 dark:border-accent bg-white dark:bg-card rounded-sm">
          <SoupIcon />
        </div>
        <h4 className="text-xl font-medium tracking-[-0.5px]">Pedidos</h4>
      </header>

      <div className="flex justify-between gap-4 items-center mt-6 flex-wrap">
        <DateRangePickerInput className="w-60" onChange={handleDateRange} />

        <ToggleGroup value="asc" onChange={handleRenderOrder} />
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
                />
              ))}
          </div>
        </div>
      </InfiniteScrollContainer>
    </>
  );
}
