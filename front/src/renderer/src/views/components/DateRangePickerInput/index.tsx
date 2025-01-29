import { formatDateRange } from '@renderer/app/utils/formatDateRange';
import { DateRange } from 'react-day-picker';
import { CgCloseO } from 'react-icons/cg';
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
  placeholder,
  onChange,
}: DateRangePickerInputProps) {
  return (
    <Container>
      <Popover.Root>
        <Popover.Trigger asChild>
          <StyledButton type="button" $error={$error}>
            <span>{placeholder || 'Datas'}</span>

            <StyledDate>
              {formatDateRange({
                from: value.from || new Date(),
                to: value.to || new Date(),
              })}
            </StyledDate>
          </StyledButton>
        </Popover.Trigger>

        <Popover.Content>
          <DateRangePicker
            value={value}
            onChange={onChange}
          />
        </Popover.Content>
      </Popover.Root>

      {$error && (
        <div className="error">
          <CgCloseO color="#F63131" />
          <span>{$error}</span>
        </div>
      )}
    </Container>
  );
}
