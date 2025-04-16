import { NumericFormat } from 'react-number-format';

import { cn } from '@app/lib/utils';

import { FieldError } from './FieldError';

interface IInputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({ value, onChange, error }: IInputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        defaultValue={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          'w-full text-primary text-[32px] font-semibold tracking-[-1px] outline-none',
          error && 'text-red-900',
        )}
      />

      {error && <FieldError message={error} />}
    </div>
  );
}
