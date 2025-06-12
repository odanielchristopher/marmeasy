import { SoupIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import { orders } from '@app/mocks/orders';
import { routes } from '@app/Router/routes';
import { DateRangePickerInput } from '@views/components/app/DateRangePickerInput';
import { OrderCard } from '@views/components/app/OrderCard';

import { ToggleGroup } from '../components/ToggleGroup';

export function Orders() {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex gap-3 items-center">
        <div className="flex items-center justify-center p-3 border border-gray-300 dark:border-accent bg-white dark:bg-card rounded-sm">
          <SoupIcon />
        </div>
        <h4 className="text-xl font-medium tracking-[-0.5px]">Pedidos</h4>
      </header>

      <div className="flex justify-between gap-4 items-center mt-6 flex-wrap">
        <DateRangePickerInput className="w-60" />

        <ToggleGroup />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 mt-5.5">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onEdit={() => navigate(`${routes.orders}/edit/${order.id}`)}
          />
        ))}
      </div>
    </>
  );
}
