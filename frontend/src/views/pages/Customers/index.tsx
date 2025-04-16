import { UsersIcon } from 'lucide-react';

import { DatePickerInput } from '@views/components/app/DatePickerInput';
import { PageHeader } from '@views/components/app/PageHeader';

export function Customers() {
  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <PageHeader
        title="Clientes"
        description="Gerencie os clientes do seu estabelecimento"
        icon={UsersIcon}
      />

      <main>
        <div>
          <DatePickerInput />
        </div>
      </main>
    </div>
  );
}
