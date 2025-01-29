import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { StyledDayPicker, StyledSpan } from './styles';

export interface DateRangePickerProps {
  value: DateRange;
  onChange?(date: DateRange): void;
}

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <StyledDayPicker
      locale={ptBR}
      selected={value}
      mode="range"
      onSelect={(date) => onChange?.(date || { from: undefined })}
      classNames={{
        caption: 'caption',
        nav: 'nav',
        nav_button_previous: 'nav_button',
        nav_button_next: 'nav_button',
        head_cell: 'head_ceil',
        button: 'button',
        day_today: 'day_today',
        day_range_end: 'day_selected',
        day_range_middle: 'day_range_middle',
        day_range_start: 'day_selected',
      }}
      formatters={{
        formatCaption: (date, options) => {
          return (
            <StyledSpan>
              {capitalizeFirstLetter(format(date, 'LLLL yyyy', options))}
            </StyledSpan>
          );
        },
      }}
    />
  );
}
