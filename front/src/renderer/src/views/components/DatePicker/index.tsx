import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { StyledDayPicker, StyledSpan } from './styles';

interface DatePickerProps {
  value: Date;
  onChange?(date: Date): void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <StyledDayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange?.(date ?? new Date())}
      classNames={{
        caption: 'caption',
        nav: 'nav',
        nav_button_previous: 'nav_button',
        nav_button_next: 'nav_button',
        head_cell: 'head_ceil',
        button: 'button',
        day_today: 'day_today',
        day_selected: 'day_selected',
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
