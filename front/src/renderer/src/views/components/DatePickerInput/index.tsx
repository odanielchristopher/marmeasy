import { formatDate } from '@renderer/app/utils/formatDate';
import { CgCloseO } from 'react-icons/cg';
import DatePicker from '../DatePicker';
import { Popover } from '../Popover';
import { Container, StyledButton, StyledDate } from './styles';

interface DatePickerInputProps {
  $error?: string;
  placeholder?: string;
  value: Date;
  onChange(date: Date): void;
}

export default function DatePickerInput({
  $error,
  placeholder,
  onChange,
  value,
}: DatePickerInputProps) {
  return (
    <Container>
      <Popover.Root>
        <Popover.Trigger asChild>
          <StyledButton type="button" $error={$error}>
            <span>{placeholder ?? 'Data'}</span>

            <StyledDate>{formatDate(value)}</StyledDate>
          </StyledButton>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={value} onChange={onChange} />
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
