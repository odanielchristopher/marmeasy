import { formatDate } from '@renderer/app/utils/formatDate';
import { useState } from 'react';
import { CgCloseO } from 'react-icons/cg';
import DatePicker from '../DatePicker';
import { Popover } from '../Popover';
import { Container, StyledButton, StyledDate } from './styles';

interface DatePickerInputProps {
  $error?: string;
}

export default function DatePickerInput({ $error }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container>
      <Popover.Root>
        <Popover.Trigger asChild>
          <StyledButton type="button" $error={$error}>
            <span>Data</span>

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
