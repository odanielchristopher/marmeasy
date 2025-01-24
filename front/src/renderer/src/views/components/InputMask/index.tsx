import React from 'react';

import { CgCloseO } from 'react-icons/cg';

import { Container, StyledInput, StyledLabel } from './styles';
export interface InputProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  isLoading?: boolean;
  $error?: string;
  value?: string | number;
  onChangeValue?(value: string): void;
  placeholder?: string;
  id?: string;
  format: string;
  mask?: string;
}

export default function InputMask({
  type,
  placeholder,
  name,
  id,
  $error,
  isLoading,
  value,
  format,
  mask,
  onChangeValue,
}: InputProps) {
  const inputId = id ?? name;

  return (
    <Container>
      <StyledInput
        format={format}
        mask={mask}
        name={name}
        id={inputId}
        type={type}
        value={value}
        placeholder=" "
        onValueChange={({ value }) => onChangeValue?.(value)}
        $error={$error}
        disabled={isLoading}
      />

      <StyledLabel htmlFor={inputId} $error={$error}>
        {placeholder}
      </StyledLabel>

      {$error && (
        <div className="error">
          <CgCloseO color="#F63131" />
          <span>{$error}</span>
        </div>
      )}
    </Container>
  );
}
