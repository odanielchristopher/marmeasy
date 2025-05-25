import { useParams } from 'react-router';

import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { Business } from '@views/assets/icons/customers/options/Business';
import { Individual } from '@views/assets/icons/customers/options/Individual';
import { PageHeader } from '@views/components/app/PageHeader';
import { RemoveModal } from '@views/components/app/RemoveModal';
import { Skeleton } from '@views/components/ui/Skeleton';

import { CustomerDropdown } from './components/CustomerDropdown';
import { NotFoundCustomer } from './components/NotFoundCustomer';
import { UpdateCustomerModal } from './components/UpdateCustomerModal';
import { useCustomerController } from './useCustomerController';

type Params = {
  id: string;
};

export function Customer() {
  const { id } = useParams<Params>();

  const {
    customer,
    isLoading,
    isRemoving,
    isOpenUpdateModal,
    isOpenRemoveModal,
    handleConfirmRemove,
    handleCloseRemoveModal,
    handleOpenUpdateModal,
    handleOpenRemoveModal,
    handleCloseUpdateModal,
  } = useCustomerController({
    customerId: id!,
  });

  const isBusiness = customer?.type === 'BUSINESS';

  if (!isLoading && !customer) {
    return <NotFoundCustomer />;
  }

  return (
    <div className="h-full pt-7 px-4 md:px-6">
      {isOpenUpdateModal && (
        <UpdateCustomerModal
          open={isOpenUpdateModal}
          customer={customer!}
          onClose={handleCloseUpdateModal}
        />
      )}
      {isOpenRemoveModal && (
        <RemoveModal
          open
          warn="Tem certeza que deseja excluir este cliente?"
          description="Os pagamentos e pedidos deste cliente ainda porderão ser vistos na sessão de relatórios."
          onConfirm={handleConfirmRemove}
          onClose={handleCloseRemoveModal}
          isLoading={isRemoving}
        />
      )}

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
          classNames={{
            rootContainer: 'flex justify-between max-w-full',
            baseElementsContainer: 'max-md:max-w-[280px]',
          }}
        >
          <CustomerDropdown
            onUpdate={handleOpenUpdateModal}
            onRemove={handleOpenRemoveModal}
          />
        </PageHeader>
      )}
    </div>
  );
}
