import { ComponentProps, forwardRef } from 'react';

import { CgCloseO } from 'react-icons/cg';

import { Container, StyledInput, StyledLabel } from './styles';
export interface InputProps extends ComponentProps<'input'> {
  name: string;
  isLoading?: boolean;
  $error?: string;
  onInputChange?(value?: number): void;
}

export const TimesNumericInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, placeholder, name, id, $error, isLoading, onInputChange, ...props },
    ref,
  ) => {
    const inputId = id ?? name;

    return (
      <Container>
        <StyledInput
          ref={ref}
          name={name}
          id={inputId}
          type={type}
          placeholder=" "
          suffix="x"
          $error={$error}
          disabled={isLoading}
          onValueChange={({ value }) => onInputChange?.(Number(value))}
          fixedDecimalScale
          {...props}
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
  },
);

TimesNumericInput.displayName = 'TimesNumericInput';
