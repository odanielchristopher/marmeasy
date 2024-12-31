import { ComponentProps, forwardRef } from 'react';

import { CgCloseO } from 'react-icons/cg';

import { Container, StyledInput, StyledLabel } from './styles';
export interface InputProps extends ComponentProps<'input'> {
  name: string;
  isLoading?: boolean;
  $error?: string;
  onInputChange?(value?: string): void;
}

export const NumericInput = forwardRef< HTMLInputElement, InputProps>(
  ({ type, placeholder, name, id, $error, isLoading, onInputChange, ...props }, ref) => {
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
        disabled={isLoading}
        onValueChange={({ value }) => onInputChange?.(value)}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        allowNegative
        fixedDecimalScale
        {...props}
      />

      <StyledLabel htmlFor={inputId} $error={$error}>{placeholder}</StyledLabel>

      { $error && (
        <div className='error'>
          <CgCloseO color='#F63131'/>
          <span>{$error}</span>
        </div>
      ) }
      </Container>
    );
  },
);

NumericInput.displayName = 'NumericInput';
