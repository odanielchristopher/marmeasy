import { IOrder } from '@app/entities/Order';
import { formatCurrency } from '@app/utils/formatCurrency';
import { formatDate } from '@app/utils/formatDate';
import { CustomerIcon } from '@views/assets/icons/customers/CustomerIcon';
import { customerIconsMap } from '@views/assets/icons/customers/customerIconsMap';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@views/components/ui/Accordion';

import { ProductCard } from './ProductCard';

interface IOrderCardProps {
  order: Omit<IOrder, 'id'>;
  onEdit(): void;
}

export function OrderCard({
  order: { customer, date, items, amount },
  onEdit,
}: IOrderCardProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="!border rounded-xl">
        <AccordionTrigger className="flex bg-white p-4 items-center data-[state=open]:rounded-b-none !no-underline dark:bg-card rounded-2xl">
          <div className="flex flex-1 items-center gap-3">
            <div className="p-2 bg-violet-100 text-violet-950 rounded-full">
              <CustomerIcon
                type={
                  customer.type.toLocaleLowerCase() as keyof typeof customerIconsMap
                }
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <div className="flex flex-col">
                <strong className="text-sm font-semibold tracking-[-0.5px] text-gray-800 dark:text-foreground">
                  {customer.name}
                </strong>

                <small className="text-sm text-muted-foreground font-normal tracking-[-0.5px]">
                  {formatDate(new Date(date))}
                </small>
              </div>

              <div className="flex flex-1 flex-col items-end">
                <span className="text-sm text-gray-800 dark:text-foreground font-normal tracking-[-0.5px]">
                  {items.length !== 1
                    ? `${items.length} items`
                    : `${items.length} item`}
                </span>

                <strong className="text-base text-teal-800 dark:text-teal-900 tracking-[-0.5px]">
                  {formatCurrency(Number(amount))}
                </strong>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-white rounded-b-xl dark:bg-card">
          <div className="px-1 grid min-[900px]:grid-cols-2 lg:grid-cols-1">
            {items.map((item) => (
              <ProductCard
                key={item.product.id}
                {...item.product}
                price={Number(item.unitPrice)}
                className="border-none"
              />
            ))}
          </div>

          <footer className="w-full px-4 flex items-center justify-end">
            <button
              type="button"
              className="px-5 py-2 text-sm font-medium text-primary flex items-center border border-primary rounded-sm justify-center hover:bg-primary hover:text-white transition-colors"
              onClick={onEdit}
            >
              <span>Editar pedido</span>
            </button>
          </footer>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
