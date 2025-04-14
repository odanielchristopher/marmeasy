import { ReceiptTextIcon } from 'lucide-react';

import { PageHeader } from '@views/components/app/PageHeader';

export function Menu() {
  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <PageHeader
        title="Pedidos"
        description="Gerencie os pedidos feitos pelos seus clientes"
        icon={ReceiptTextIcon}
      />

      <main />
    </div>
  );
}
