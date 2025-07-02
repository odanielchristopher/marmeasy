import {
  ArrowDownWideNarrowIcon,
  ArrowUpNarrowWideIcon,
  HandCoinsIcon,
} from 'lucide-react';

import { DateRangePickerInput } from '@views/components/app/DateRangePickerInput';
import { InfiniteScrollContainer } from '@views/components/app/InfiniteScrollContainer';
import { NotFoundError } from '@views/components/app/NotFoundError';
import { SortOrderToggle } from '@views/components/app/SortOrderToggle';
import { Skeleton } from '@views/components/ui/Skeleton';
import { EditPaymentModal } from '@views/modals/EditPaymentModal';

import { PaymentCard } from '../../components/PaymentCard';

import { usePaymentsSessionController } from './usePaymentsSessionController';

interface IPaymentsSessionProps {
  customerId: string;
}

export function PaymentsSession({ customerId }: IPaymentsSessionProps) {
  const {
    payments,
    hasPayments,
    isLoading,
    infiniteScroll,
    handleDateRange,
    order,
    handleOrder,
    isOpenEditPaymentModal,
    handleCloseEditProductModal,
    handleOpenEditProductModal,
    paymentBeenEdited,
  } = usePaymentsSessionController(customerId);

  return (
    <>
      {isOpenEditPaymentModal && (
        <EditPaymentModal
          open
          onClose={handleCloseEditProductModal}
          payment={paymentBeenEdited!}
        />
      )}

      <header className="flex gap-3 items-center">
        <div className="flex items-center justify-center p-3 border border-gray-300 dark:border-accent bg-white dark:bg-card rounded-sm">
          <HandCoinsIcon />
        </div>
        <h4 className="text-xl font-medium tracking-[-0.5px]">Pagamentos</h4>
      </header>

      <div className="flex justify-between gap-4 items-center mt-6 flex-wrap">
        <DateRangePickerInput className="w-60" onChange={handleDateRange} />

        <SortOrderToggle
          value={order}
          options={[
            {
              icon: ArrowUpNarrowWideIcon,
              value: 'desc',
              label: 'Mais recente',
            },
            {
              icon: ArrowDownWideNarrowIcon,
              value: 'asc',
              label: 'Mais antiga',
            },
          ]}
          onChange={handleOrder}
        />
      </div>

      <InfiniteScrollContainer
        isLoading={isLoading}
        infiniteScroll={infiniteScroll}
      >
        <div className="flex-1 flex flex-col justify-between gap-4 pb-4 md:pb-6">
          {!isLoading && !hasPayments && (
            <NotFoundError
              image={{
                type: 'search',
                alt: 'Sem pagamentos encontrados!',
              }}
              message="Não encontramos nenhum pagamento para esse cliente!"
              classNames={{
                root: 'mt-10',
                message: 'max-w-[300px] text-center',
              }}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 mt-5.5">
            {isLoading && (
              <>
                <Skeleton className="min-h-19 rounded-xl" />
                <Skeleton className="min-h-19 rounded-xl" />
                <Skeleton className="min-h-19 rounded-xl" />
                <Skeleton className="min-h-19 rounded-xl" />
                <Skeleton className="min-h-19 rounded-xl" />
                <Skeleton className="min-h-19 rounded-xl" />
              </>
            )}

            {!isLoading &&
              hasPayments &&
              payments.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  payment={payment}
                  onClick={() => handleOpenEditProductModal(payment)}
                />
              ))}
          </div>
        </div>
      </InfiniteScrollContainer>
    </>
  );
}
