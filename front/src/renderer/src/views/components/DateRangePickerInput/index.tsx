import { formatDateRange } from '@renderer/app/utils/formatDateRange';
import { DateRange } from 'react-day-picker';
import { LuCalendar } from 'react-icons/lu';
import DateRangePicker from '../DateRangePicker';
import { Popover } from '../Popover';
import { Container, StyledButton, StyledDate } from './styles';

export interface DateRangePickerInputProps {
  $error?: string;
  placeholder?: string;
  value: DateRange;
  onChange(date: DateRange): void;
}

export default function DateRangePickerInput({
  value,
  $error,
  onChange,
}: DateRangePickerInputProps) {
  return (
    <Container>
      <Popover.Root>
        <Popover.Trigger asChild>
          <StyledButton type="button" $error={$error}>
            <LuCalendar size={20} />

            <StyledDate>
              {formatDateRange({
                from: value.from,
                to: value.to,
              }) || 'Escolha um período'}
            </StyledDate>
          </StyledButton>
        </Popover.Trigger>

        <Popover.Content>
          <DateRangePicker value={value} onChange={onChange} />
        </Popover.Content>
      </Popover.Root>
    </Container>
  );
}
