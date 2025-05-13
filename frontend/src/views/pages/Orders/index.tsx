import { NotebookTextIcon } from 'lucide-react';

import { PageHeader } from '@views/components/app/PageHeader';

export function Orders() {
  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <PageHeader
        title="Pedidos"
        description="Organize os produtos do seu estabelecimento"
        icon={NotebookTextIcon}
      />

      <main />
    </div>
  );
}
