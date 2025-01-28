import { formatDate } from '@renderer/app/utils/formatDate';
import { useState } from 'react';
import { CgCloseO } from 'react-icons/cg';
import DatePicker from '../DatePicker';
import { Popover } from '../Popover';
import { Container, StyledButton, StyledDate } from './styles';

interface DatePickerInputProps {
  $error?: string;
  placeholder?: string;
}

export default function DatePickerInput({ $error, placeholder }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container>
      <Popover.Root>
        <Popover.Trigger asChild>
          <StyledButton type="button" $error={$error}>
            <span>{placeholder ?? 'Data'}</span>

            <StyledDate>{formatDate(selectedDate)}</StyledDate>
          </StyledButton>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
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
