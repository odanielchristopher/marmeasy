import { CustomerIcon } from '@views/assets/icons/customers/CustomerIcon';
import { customerIconsMap } from '@views/assets/icons/customers/customerIconsMap';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@views/components/ui/Accordion';

interface IOrderCardProps {
  order: {
    date: string;
    quantity: number;
    total: number;
    customer: {
      id: string;
      type: 'BUSINESS' | 'INDIVIDUAL';
      name: string;
    };
  };
}

export function OrderCard({
  order: { customer, date, quantity, total },
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
                <strong className="text-base text-gray-800 dark:text-foreground font-bold tracking-[-0.5px]">
                  {customer.name}
                </strong>

                <small className="text-sm text-gray-600 dark:text-gray-400 font-normal tracking-[-0.5px]">
                  {date}
                </small>
              </div>

              <div className="flex flex-1 flex-col items-end">
                <span className="text-sm text-gray-800 dark:text-foreground font-normal tracking-[-0.5px]">
                  {quantity} items
                </span>

                <strong className="text-base text-teal-800 dark:text-teal-900 tracking-[-0.5px]">
                  R$ {total}
                </strong>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-white rounded-b-xl dark:bg-card">
          Aqui aparece o conteúdo dos pedido.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
