import { useParams } from 'react-router';

import { cn } from '@app/lib/utils';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { Business } from '@views/assets/icons/customers/options/Business';
import { Individual } from '@views/assets/icons/customers/options/Individual';
import { PageHeader } from '@views/components/app/PageHeader';
import { RemoveModal } from '@views/components/app/RemoveModal';

import { CustomerDropdown } from './components/CustomerDropdown';
import { CustomerSkeleton } from './components/CustomerSkeleton';
import { NotFoundCustomer } from './components/NotFoundCustomer';
import { UpdateCustomerModal } from './components/UpdateCustomerModal';
import { OrdersSession } from './sessions/Orders';
import { Payments } from './sessions/Payments';
import { useCustomerController } from './useCustomerController';

type Params = {
  id: string;
};

export function Customer() {
  const { id } = useParams<Params>();

  const {
    customer,
    sessions,
    isLoading,
    isRemoving,
    currentSession,
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

  if (isLoading && !customer) {
    return <CustomerSkeleton />;
  }

  if (!customer) {
    return <NotFoundCustomer />;
  }

  return (
    <>
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

      <div className="h-full pt-7 px-4 md:px-6">
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

        <main className="mt-8 md:flex md:items-start">
          <aside className="flex h-fit flex-col gap-4 max-md:flex-row flex-wrap">
            {sessions.map(({ label, icon: Icon, isActive, handler }) => (
              <button
                key={label}
                type="button"
                className={cn(
                  'relative flex flex-shrink-0 items-center gap-3 py-1.5 pl-3 outline-none border-transparent border-2 lg:min-w-[192px] lg:max-w-[284px] lg:py-0 lg:pl-6 text-foreground transition-colors opacity-70 cursor-pointer max-md:pl-1.5',
                  isActive && 'border-l-teal-900 opacity-100',
                )}
                tabIndex={0}
                onClick={handler}
              >
                <div className="grid place-items-center justify-center p-2.5 border border-gray-300 dark:border-accent bg-white dark:bg-card rounded-sm max-md:p-2">
                  <Icon className="size-4.5 max-sm:size-4" />
                </div>

                <span className="text-sm dark:text-foreground text-start font-display font-medium tracking-[-0.5px]">
                  {label}
                </span>
              </button>
            ))}
          </aside>

          <div className="max-md:mt-3 md:pl-10 flex-1">
            {currentSession === 'ORDERS' && <OrdersSession customerId={id!} />}
            {currentSession === 'PAYMENTS' && <Payments />}
          </div>
        </main>
      </div>
    </>
  );
}
