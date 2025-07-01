import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { DateRangePickerInput } from '@views/components/app/DateRangePickerInput';
import { SortOrderToggle } from '@views/components/app/SortOrderToggle';
import { Button } from '@views/components/ui/Button';
import { Modal } from '@views/components/ui/Modal';

export type OrderFilters = {
  dateRange?: DateRange;
  order: 'asc' | 'desc';
};

interface IFiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(value: OrderFilters): void;
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters,
}: IFiltersModalProps) {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  function handleApplyFilters() {
    onApplyFilters({
      dateRange,
      order,
    });
    onClose();
  }

  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div className="flex flex-col">
        <h4 className="text-base font-medium tracking-[-1px] mb-3 text-gray-800 dark:text-foreground">
          Período
        </h4>

        <DateRangePickerInput
          onChange={(value) => setDateRange(value)}
          value={dateRange}
        />
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
                icon: ArrowUpNarrowWideIcon,
                value: 'desc',
                label: 'Mais recente',
                className: {
                  onSelected:
                    '!bg-accent border border-gray-300 dark:border-white',
                },
              },
              {
                icon: ArrowDownWideNarrowIcon,
                value: 'asc',
                label: 'Mais antiga',
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
        className="w-full mt-5"
        onClick={handleApplyFilters}
      >
        Aplicar filtros
      </Button>
    </Modal>
  );
}
