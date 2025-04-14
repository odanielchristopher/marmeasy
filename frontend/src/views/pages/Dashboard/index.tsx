import { ChartBarIncreasingIcon } from 'lucide-react';

import { PageHeader } from '@views/components/app/PageHeader';

export function Dashboard() {
  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <PageHeader
        title="Relatórios"
        description="Visualize as informações do seu estabelecimento"
        icon={ChartBarIncreasingIcon}
      />

      <main />
    </div>
  );
}
