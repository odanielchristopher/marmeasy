import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { Caption, Nav, NavButtonPrevious, NavButtonNext, HeadCell, Button, DayToday, DaySelected } from './styles';
import { capitalizeFirstLetter } from '../../../app/utils/capitalizeFirstLetter';

interface DatePickerProps {
  value: Date;
  onChange?(date: Date): void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange?.(date ?? new Date())}
      components={{
        Caption,
        Nav,
        NavButtonPrevious,
        NavButtonNext,
        HeadCell,
        Button,
        DayToday,
        DaySelected,
      }}
      formatters={{
        formatCaption: (date, options) => {
          return capitalizeFirstLetter(format(date, 'LLLL yyyy', { locale: ptBR }));
        },
      }}
    />
  );
}