import { ICustomer } from '@app/entities/Customer';
import { cn } from '@app/lib/utils';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { formatCurrency } from '@app/utils/formatCurrency';
import { formatPhone } from '@app/utils/formatPhone';
import { CustomerIcon } from '@views/assets/icons/customers/CustomerIcon';

interface ICustomerProps {
  customer: ICustomer;
}

export function CustomerCard({ customer }: ICustomerProps) {
  return (
    <div
      className="bg-white dark:bg-card border border-gray-300 dark:border-accent p-3 rounded-md min-h-44 flex flex-col justify-between hover:border-primary hover:scale-[102%] transition-all outline-none focus:border-ring cursor-pointer border-b-4"
      style={{ borderBottomColor: customer.color }}
    >
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2.5">
          <CustomerIcon
            type={customer.type.toLowerCase()}
            color={customer.color}
          />

          <span className="text-lg font-medium tracking-[-0.5px]">
            {capitalizeFirstLetter(customer.name)}
          </span>
        </div>

        <span className="text-muted-foreground text-sm tracking-[-0.5px]">
          {formatPhone(customer.phone ?? '')}
        </span>
      </div>

      <div className="flex flex-col">
        <span
          className={cn(
            'text-base text-gray-800 dark:text-foreground font-medium tracking-[-1px]',
            customer.balance > 0 && '!text-teal-900 dark:!text-teal-700',
            customer.balance < 0 && '!text-red-900 dark:!text-red-700',
          )}
        >
          {formatCurrency(customer.balance)}
        </span>

        <small className="text-muted-foreground tracking-[-0.5px]">
          Saldo atual
        </small>
      </div>
    </div>
  );
}
