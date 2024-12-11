import { ComponentProps } from 'react';
import { Container, StyledInput, StyledLabel } from './styles';

export interface InputProps extends ComponentProps<'input'> {
  name: string;
  $error?: string
}

export default function Input({ type,
  placeholder,
  name,
  id,
  value,
  $error,
  onChange,
  ...props
}: InputProps) {
  const inputId = id ?? name;

  return (
    <Container>
      <StyledInput
      name={name}
      id={inputId}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      $error={$error}
      {...props}
    />

      <StyledLabel htmlFor={inputId} $error={$error}>{placeholder}</StyledLabel>
    </Container>
  );
}
