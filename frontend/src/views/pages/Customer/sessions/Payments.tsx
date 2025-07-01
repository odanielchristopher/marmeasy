import { HandCoinsIcon } from 'lucide-react';

import { cn } from '@app/lib/utils';
import { payments } from '@app/mocks/payments';
import { formatCurrency } from '@app/utils/formatCurrency';
import { formatDate } from '@app/utils/formatDate';
import { PaymentIcon } from '@views/assets/icons/payments/PaymentIcon';
import { DateRangePickerInput } from '@views/components/app/DateRangePickerInput';

const translateMap = {
  CREDIT: {
    title: 'Crédito',
    icon: {
      color: 'text-violet-950',
      bg: 'bg-violet-100',
    },
  },
  DEBIT: {
    title: 'Débito',
    icon: {
      color: 'text-blue-900',
      bg: 'bg-blue-100',
    },
  },
  CASH: {
    title: 'Dinheiro',
    icon: {
      color: 'text-green-900',
      bg: 'bg-green-100',
    },
  },
};

export function Payments() {
  return (
    <>
      <header className="flex gap-3 items-center">
        <div className="flex items-center justify-center p-3 border border-gray-300 dark:border-accent bg-white dark:bg-card rounded-sm">
          <HandCoinsIcon />
        </div>
        <h4 className="text-xl font-medium tracking-[-0.5px]">Pagamentos</h4>
      </header>

      <div className="flex justify-between gap-4 items-center mt-6 flex-wrap">
        <DateRangePickerInput className="w-60" />

        {/* <ToggleGroup /> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 mt-5.5">
        {payments.map((payment) => (
          <button
            key={payment.id}
            type="button"
            className="flex bg-white dark:bg-card px-4 py-3 rounded-xl items-center border hover:border-primary hover:scale-[101%] transition-all"
          >
            <div className="flex flex-1 items-center gap-3">
              <div
                className={cn(
                  'p-1.5 rounded-full',
                  translateMap[payment.type].icon.bg,
                )}
              >
                <PaymentIcon
                  type={payment.type.toLowerCase()}
                  className={cn(
                    'size-8',
                    translateMap[payment.type].icon.color,
                  )}
                />
              </div>

              <div className="flex flex-col items-start">
                <strong className="text-sm font-semibold tracking-[-0.5px] text-gray-800 dark:text-foreground">
                  {translateMap[payment.type].title}
                </strong>

                <small className="text-sm text-muted-foreground font-normal tracking-[-0.5px]">
                  {formatDate(new Date(payment.date))}
                </small>
              </div>
            </div>

            <strong className="text-base font-bold tracking-[-0.5px] text-teal-900 dark:text-green-800">
              {formatCurrency(payment.value)}
            </strong>
          </button>
        ))}
      </div>
    </>
  );
}
