import * as RdxToogleGroup from '@radix-ui/react-toggle-group';
import { OptionPeriodType } from '@renderer/app/contexts/DashboardContext';
import { StyledRdxToogleGroupItem } from './styles';

interface ToogleGroupProps {
  options: {
    label: string;
    value: OptionPeriodType;
  }[];
  defaultValue?: string;
  value?: string;
  onChange?(value: string): void;
}

export function ToogleGroup({
  options,
  value,
  defaultValue,
  onChange,
}: ToogleGroupProps) {
  return (
    <RdxToogleGroup.Root
      type="single"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(selectedValue) => onChange?.(selectedValue)}
    >
      {options.map((option, index) => (
        <StyledRdxToogleGroupItem value={option.value} key={index}>
          {option.label}
        </StyledRdxToogleGroupItem>
      ))}
    </RdxToogleGroup.Root>
  );
}
