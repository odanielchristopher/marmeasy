import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { CustomerType } from '@app/entities/Customer';
import { cn } from '@app/lib/utils';
import { CustomerIcon } from '@views/assets/icons/customers/CustomerIcon';
import { SortOrderToggle } from '@views/components/app/SortOrderToggle';
import { Button } from '@views/components/ui/Button';
import { Modal } from '@views/components/ui/Modal';

type CustomerTypeOption = CustomerType | 'ALL';
export type CustomerFilters = {
  customerType: CustomerTypeOption;
  order: 'asc' | 'desc';
};

interface IFiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(value: CustomerFilters): void;
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters,
}: IFiltersModalProps) {
  const [selectedCutomerType, setSelectedCustomerType] =
    useState<CustomerTypeOption>('ALL');

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const customerTypes = useMemo(
    () => [
      {
        value: 'ALL',
        label: 'Todos os clientes',
        handler: () => setSelectedCustomerType('ALL'),
      },
      {
        value: 'INDIVIDUAL',
        label: 'Clientes físicos',
        handler: () => setSelectedCustomerType('INDIVIDUAL'),
      },
      {
        value: 'BUSINESS',
        label: 'Clientes jurídicos',
        handler: () => setSelectedCustomerType('BUSINESS'),
      },
    ],
    [],
  );

  function handleApplyFilters() {
    onApplyFilters({
      customerType: selectedCutomerType,
      order,
    });
    onClose();
  }

  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div className="flex flex-col">
        <h4 className="text-base font-medium tracking-[-1px] mb-3 text-gray-800 dark:text-foreground">
          Tipo de cliente
        </h4>

        {customerTypes.map((type) => (
          <Button
            key={type.value}
            type="button"
            className={cn(
              'justify-start h-12 border border-transparent mt-2',
              selectedCutomerType === type.value &&
                'bg-accent border border-gray-300 dark:border-white',
            )}
            variant="ghost"
            onClick={type.handler}
          >
            <CustomerIcon
              className="size-5 text-gray-800 dark:text-white"
              type={type.value.toLowerCase()}
            />
            <span className="font-medium text-sm text-gray-800 dark:text-foreground">
              {type.label}
            </span>
          </Button>
        ))}
      </div>

      <div className="flex flex-col mt-6">
        <h4 className="text-base font-medium tracking-[-1px] mb-3 text-gray-800 dark:text-foreground">
          Deixar em ordem
        </h4>

        <div>
          <SortOrderToggle
            value={order}
            options={[
              {
                icon: ArrowDownWideNarrowIcon,
                value: 'asc',
                label: 'Alfabética',
                className: {
                  onSelected:
                    '!bg-accent border border-gray-300 dark:border-white',
                },
              },
              {
                icon: ArrowUpNarrowWideIcon,
                value: 'desc',
                label: 'Invertida',
                className: {
                  onSelected:
                    '!bg-accent border border-gray-300 dark:border-white',
                },
              },
            ]}
            onChange={(value) => setOrder(value)}
          />
        </div>
      </div>

      <Button
        type="button"
        className="w-full mt-10"
        onClick={handleApplyFilters}
      >
        Aplicar filtros
      </Button>
    </Modal>
  );
}
