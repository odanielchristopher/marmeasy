import { ComponentProps, forwardRef } from 'react';
import { Container, StyledInput, StyledLabel } from './styles';

export interface InputProps extends ComponentProps<'input'> {
  name: string;
  $error?: string
}

export const Input = forwardRef< HTMLInputElement, InputProps>(
  ({ type, placeholder, name, id, $error,...props }, ref) => {
    const inputId = id ?? name;

    return (
      <Container>
        <StyledInput
        ref={ref}
        name={name}
        id={inputId}
        type={type}
        placeholder=" "
        $error={$error}
        {...props}
      />

        <StyledLabel htmlFor={inputId} $error={$error}>{placeholder}</StyledLabel>
      </Container>
    );
  },
);
