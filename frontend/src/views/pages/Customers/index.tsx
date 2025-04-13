import { UsersIcon } from 'lucide-react';

import { PageHeader } from '@views/components/PageHeader';

export function Customers() {
  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <PageHeader
        title="Clientes"
        description="Gerencie os clientes do seu estabelecimento"
        icon={UsersIcon}
      />

      <main />
    </div>
  );
}
