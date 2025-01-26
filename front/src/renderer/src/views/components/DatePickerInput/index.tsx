import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { formatDate } from '../../../app/utils/formatDate';
import { StyledDatePicker } from '../DatePicker';
import { Popover } from '../Popover';
import { Button, Container, ErrorContainer, ErrorMessage } from './styles';

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export default function DatePickerInput({
  className,
  value,
  onChange,
  error,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

return (
    <Container>
      <Popover.Root>
        <Popover.Trigger>
          <Button type="button" $error={!!error} className={className}>
            <span>{formatDate(selectedDate)}</span>
          </Button>
        </Popover.Trigger>

        <Popover.Content>
          <StyledDatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <ErrorContainer>
          <CrossCircledIcon />
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      )}
    </Container>
  );


}
