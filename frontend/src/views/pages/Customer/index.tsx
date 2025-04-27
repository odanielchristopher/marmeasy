import { useParams } from 'react-router';

import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { Business } from '@views/assets/icons/customers/options/Business';
import { Individual } from '@views/assets/icons/customers/options/Individual';
import { PageHeader } from '@views/components/app/PageHeader';
import { Skeleton } from '@views/components/ui/Skeleton';

import { useCustomerController } from './useCustomerController';

type Params = {
  id: string;
};

export function Customer() {
  const { id } = useParams<Params>();

  const { customer, isLoading } = useCustomerController({ customerId: id! });

  const isBusiness = customer?.type === 'BUSINESS';

  return (
    <div className="h-full pt-7 px-4 md:px-6">
      {isLoading && !customer && (
        <div className="max-w-[280px] md:max-w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8" />

            <Skeleton className="h-8 w-40" />
          </div>

          <Skeleton className="mt-2 h-6 w-100 rounded-[4px]" />
        </div>
      )}

      {customer && (
        <PageHeader
          icon={isBusiness ? Business : Individual}
          title={capitalizeFirstLetter(customer.name)}
          description={`Visualize os pedidos e pagamentos do(a) ${capitalizeFirstLetter(customer.name)}`}
        />
      )}
    </div>
  );
}
