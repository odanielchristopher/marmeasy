import { NotebookTextIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { orders } from '@app/mocks/orders';
import { routes } from '@app/Router/routes';
import { CustomerIcon } from '@views/assets/icons/customers/CustomerIcon';
import { FilterIcon } from '@views/assets/icons/FilterIcon';
import { Aside } from '@views/components/app/Aside';
import { OrderCard } from '@views/components/app/OrderCard';
import { PageHeader } from '@views/components/app/PageHeader';
import { Button } from '@views/components/ui/Button';
import { InputSearch } from '@views/components/ui/InputSearch';

export function Orders() {
  const [customerType, setCustomerType] = useState<{
    value: 'ALL' | 'INDIVIDUAL' | 'BUSINESS';
    label: 'Todos os clientes' | 'Clientes físicos' | 'Clientes jurídicos';
  }>({
    value: 'ALL',
    label: 'Todos os clientes',
  });
  const navigate = useNavigate();

  return (
    <div className="h-full pt-7 px-4 md:px-6">
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
                setCustomerType({
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
                setCustomerType({
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
                setCustomerType({
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
                className="stroke-2"
              />
            </div>
            <h4 className="text-xl font-medium tracking-[-0.5px]">
              {customerType.label}
            </h4>
          </header>

          <div className="mt-6 flex gap-4 h-[52px] items-center">
            <InputSearch
              placeholder="Quem você está procurando?"
              className="w-full max-w-[400px]"
            />

            <Button variant="outline" type="button">
              <FilterIcon className="text-gray-800 dark:text-foreground" />
            </Button>
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
        </div>
      </main>
    </div>
  );
}
