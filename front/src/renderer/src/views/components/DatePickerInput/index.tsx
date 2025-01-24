import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { formatDate } from "../../../app/utils/formatDate";
import { DatePicker } from "../DatePicker";
import { Popover } from "../Popover";
import { Container, Button, Label, ErrorContainer, ErrorMessage } from "./styles";

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export default function DatePickerInput({ className, value, onChange, error }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <Container>
      <Popover.Root>
        <Popover.Trigger>
          <Button type="button" error={!!error} className={className}>
            <Label>Data</Label>
            <span>{formatDate(selectedDate)}</span>
          </Button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
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
