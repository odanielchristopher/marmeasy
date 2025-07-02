import { IPayment } from '@app/entities/Payment';
import { cn } from '@app/lib/utils';
import { formatCurrency } from '@app/utils/formatCurrency';
import { formatDate } from '@app/utils/formatDate';
import { PaymentIcon } from '@views/assets/icons/payments/PaymentIcon';

import { paymentsMap } from '../sessions/Payments/paymentsMap';

interface IPaymentCardProps {
  payment: IPayment;
  onClick?(): void;
}

export function PaymentCard({ payment, onClick }: IPaymentCardProps) {
  return (
    <button
      type="button"
      className="flex bg-white dark:bg-card px-4 py-3 rounded-xl items-center border hover:border-primary hover:scale-[101%] transition-all"
      onClick={onClick}
    >
      <div className="flex flex-1 items-center gap-3">
        <div
          className={cn(
            'p-1.5 rounded-full',
            paymentsMap[payment.type].icon.bg,
          )}
        >
          <PaymentIcon
            type={payment.type.toLowerCase()}
            className={cn('size-8', paymentsMap[payment.type].icon.color)}
          />
        </div>

        <div className="flex flex-col items-start">
          <strong className="text-sm font-semibold tracking-[-0.5px] text-gray-800 dark:text-foreground">
            {paymentsMap[payment.type].title}
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
  );
}
