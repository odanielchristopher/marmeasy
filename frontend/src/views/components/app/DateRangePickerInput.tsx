import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { cn } from '@app/lib/utils';
import { formatDateRange } from '@app/utils/formatDateRange';
import { FieldError } from '@views/components/ui/FieldError';

import { Calendar } from '../ui/Calendar';

interface IDateRangePickerInputProps {
  value?: DateRange;
  onChange?(value: DateRange | undefined): void;
  className?: string;
  error?: string;
}

export function DateRangePickerInput({
  value,
  className,
  error,
  onChange,
}: IDateRangePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<DateRange>(
    value ?? { from: undefined },
  );

  function handleChangeDate(date: DateRange | undefined) {
    setSelectedDate(date || { from: undefined });
    onChange?.(date);
  }

  return (
    <div>
      <Popover modal={false}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 dark:text-foreground outline-none focus:border-gray-800 transition-all flex items-center gap-3 dark:border-accent',
              'dark:bg-input/30',
              error && '!border-red-900',
              className,
            )}
          >
            <CalendarIcon className="size-5" />

            <span className="text-sm tracking-[-0.5px]">
              {formatDateRange(selectedDate) || 'Escolha um período'}
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            'rounded-2xl p-2 bg-white z-[99] space-y-1 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-fit',
            'data-[side=bottom]:animate-slide-down-and-fade',
            'data-[side=top]:animate-slide-up-and-fade',
            'dark:bg-card dark:border-accent dark:border',
          )}
        >
          <Calendar
            mode="range"
            selected={selectedDate}
            value={selectedDate}
            onSelect={(date) => handleChangeDate(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {error && <FieldError message={error} />}
    </div>
  );
}
