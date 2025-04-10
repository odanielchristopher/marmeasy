import { Factory, User } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/Accordion';

interface IOrderProps {
  order: {
    date: string;
    quantity: number;
    total: number;
    customer: {
      id: string;
      type: string;
      name: string;
    };
  };
}

export function Order({
  order: { customer, date, quantity, total },
}: IOrderProps) {
  const Icon = customer.type === 'INDIVIDUAL' ? User : Factory;

  // --card: 34 50% 10%;
  // --card-foreground: 34 5% 100%;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-md">
        <AccordionTrigger className="flex bg-white p-4 items-center data-[state=open]:rounded-b-none !no-underline dark:bg-card">
          <div className="flex flex-1 items-center gap-3">
            <div className="p-2 bg-violet-100 text-violet-950 rounded-full">
              <Icon className="size-6" strokeWidth={1.5} />
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
        <AccordionContent className="bg-white rounded-b-md dark:bg-accent">
          Aqui aparece o conteúdo dos pedido.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
