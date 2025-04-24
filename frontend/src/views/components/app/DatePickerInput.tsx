import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { useState } from 'react';

import { cn } from '@app/lib/utils';
import { formatDate } from '@app/utils/formatDate';
import { FieldError } from '@views/components/ui/FieldError';

import { Calendar } from '../ui/Calendar';

interface IDatePickerInputProps {
  value?: Date;
  onChange?(value: Date): void;
  className?: string;
  error?: string;
}

export function DatePickerInput({
  value,
  className,
  error,
  onChange,
}: IDatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] pt-4 text-gray-700 dark:text-foreground outline-none focus:border-gray-800 transition-all text-left relative dark:border-accent',
              'dark:bg-input/30',
              error && '!border-red-900',
              className,
            )}
          >
            <span className="absolute text-gray-600 dark:text-muted-foreground text-xs left-[13px] top-2 pointer-events-none">
              Data
            </span>

            <span>{formatDate(selectedDate)}</span>
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
            mode="single"
            selected={selectedDate}
            value={selectedDate}
            onSelect={(date) => handleChangeDate(date ?? new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {error && <FieldError message={error} />}
    </div>
  );
}
