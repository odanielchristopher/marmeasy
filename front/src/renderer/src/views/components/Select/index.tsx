import * as RdxSelect from '@radix-ui/react-select';

import { ArrowIcon } from '@renderer/assets/Icons/ArrowIcon';
import { useState } from 'react';
import { CgCloseO } from 'react-icons/cg';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import {
  Container,
  SelectContainer,
  StyledLabel,
  StyledRdxSelectContent,
  StyledRdxSelectDownButton,
  StyledRdxSelectIcon,
  StyledRdxSelectItem,
  StyledRdxSelectTrigger,
  StyledRdxSelectUpButton,
  StyledRdxSelectViewport,
} from './styles';

interface SelectProps {
  $error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange?(value: string): void;
}

export default function Select({
  $error,
  options,
  onChange,
  placeholder,
  value,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? '');

  function handleSelect(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  return (
    <Container>
      <SelectContainer>
        <StyledLabel $error={$error} $isSeleted={!!selectedValue}>
          {placeholder}
        </StyledLabel>

        <RdxSelect.Root value={value} onValueChange={handleSelect}>
          <StyledRdxSelectTrigger $error={$error}>
            <RdxSelect.Value />

            <StyledRdxSelectIcon>
              <ArrowIcon />
            </StyledRdxSelectIcon>
          </StyledRdxSelectTrigger>

          <RdxSelect.Portal>
            <StyledRdxSelectContent position="popper" align="center">
              <StyledRdxSelectUpButton>
                <FaChevronUp size={24} />
              </StyledRdxSelectUpButton>

              <StyledRdxSelectViewport>
                {options.map((option) => (
                  <StyledRdxSelectItem key={option.value} value={option.value}>
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                  </StyledRdxSelectItem>
                ))}
              </StyledRdxSelectViewport>

              <StyledRdxSelectDownButton>
                <FaChevronDown size={24} />
              </StyledRdxSelectDownButton>
            </StyledRdxSelectContent>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </SelectContainer>

      {$error && (
        <div className="error">
          <CgCloseO color="#F63131" />
          <span>{$error}</span>
        </div>
      )}
    </Container>
  );
}
