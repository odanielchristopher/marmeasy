import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { cn } from '@app/lib/utils';

import { FieldError } from './FieldError';

interface IInputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
  name?: string;
  placeholder?: string;
  variant?: 'default' | 'normalInput';
}

export function InputCurrency({
  value,
  onChange,
  error,
  variant,
  placeholder,
  name,
  ...props
}: IInputCurrencyProps & NumericFormatProps) {
  const inputId = name;

  return (
    <div className="relative">
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        defaultValue={value}
        onValueChange={(event) => onChange?.(event.value)}
        prefix={variant === 'normalInput' ? 'R$ ' : ''}
        className={cn(
          'w-full text-primary text-[32px] font-semibold tracking-[-1px] outline-none',
          variant === 'normalInput' &&
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex  min-w-0 px-3 py-1 text-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pt-4 peer placeholder-shown:pt-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-white w-full rounded-lg border border-gray-500 dark:border-accent h-[52px] text-gray-700 dark:text-foreground font-normal',
          error && 'text-red-900',
        )}
        placeholder=" "
        {...props}
      />

      {variant === 'normalInput' && (
        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-muted-foreground peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 transition-all"
        >
          {placeholder}
        </label>
      )}

      {error && <FieldError message={error} />}
    </div>
  );
}
