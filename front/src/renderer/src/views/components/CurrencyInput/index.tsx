import { forwardRef } from 'react';
import { CgCloseO } from 'react-icons/cg';
import { Container, StyledInput } from './styles';

interface InputCurrencyProps {
  $error?: string;
  value?: string | number;
  onChange?(value?: string): void;
  maxLength?: number;
}

export const CurrencyInput = forwardRef<HTMLInputElement, InputCurrencyProps>(
  ({ $error, onChange, value, maxLength }, ref) => {
    return (
      <Container>
        <StyledInput
          getInputRef={ref}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          placeholder="0,00"
          allowNegative
          fixedDecimalScale
          maxLength={maxLength}
          value={value}
          onValueChange={({ value }) => onChange?.(value)}
          $error={$error}
        />

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

CurrencyInput.displayName = 'CurrencyInput';
