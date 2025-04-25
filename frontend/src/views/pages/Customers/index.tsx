import { UsersIcon } from 'lucide-react';

import { ICustomer } from '@app/entities/Customer';
import { PageHeader } from '@views/components/app/PageHeader';

import { CustomerCard } from './components/CustomerCard';

const customers: ICustomer[] = [
  {
    id: '#1',
    name: 'daniel',
    type: 'INDIVIDUAL',
    color: '#BE4BDB',
    balance: 17.5,
  },
  {
    id: '#12',
    name: 'oficina',
    type: 'BUSINESS',
    color: '#FAB005',
    balance: -123.5,
  },
  {
    id: '#123',
    name: 'plataforma',
    type: 'BUSINESS',
    color: '#4C6EF5',
    balance: 236.5,
  },
  {
    id: '#1234',
    name: 'lucas',
    type: 'INDIVIDUAL',
    color: '#82C91E',
    balance: 40,
  },
];

export function Customers() {
  function handleCustomer(customer: ICustomer) {
    console.log({ customer });
  }

  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <PageHeader
        title="Clientes"
        description="Gerencie os clientes do seu estabelecimento"
        icon={UsersIcon}
      />

      <main className="mt-8">
        <div className="bg-red-500 flex gap-4 h-[52px] items-center">
          <div>SearchInput</div>
          <div>filters</div>
        </div>

        <div className="mt-7 grid gap-4 grid-cols-1 min-[510px]:grid-cols-2 lg:grid-cols-4 pb-6">
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onClick={handleCustomer}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
