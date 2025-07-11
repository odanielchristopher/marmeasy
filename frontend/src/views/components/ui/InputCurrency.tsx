import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { cn } from '@app/lib/utils';

import { FieldError } from './FieldError';

interface IInputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
  name?: string;
  placeholder?: string;
  variant?: 'default' | 'pattern';
  classNames?: {
    error?: string;
    label?: string;
    input?: string;
  };
}

export function InputCurrency({
  value,
  onChange,
  error,
  variant = 'default',
  placeholder,
  name,
  classNames,
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
        prefix={variant === 'pattern' ? 'R$ ' : ''}
        className={cn(
          'w-full text-primary text-[32px] font-semibold tracking-[-1px] outline-none',
          variant === 'pattern' &&
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex  min-w-0 px-3 py-1 text-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pt-4 peer placeholder-shown:pt-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-white w-full rounded-lg border border-gray-500 dark:border-accent h-[52px] text-gray-700 dark:text-foreground font-normal',
          error && 'text-red-900',
          classNames?.input,
        )}
        placeholder=" "
        {...props}
      />

      {variant === 'pattern' && (
        <label
          htmlFor={inputId}
          className={cn(
            'absolute text-xs left-[13px] top-2 pointer-events-none text-muted-foreground peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 transition-all',
            classNames?.label,
          )}
        >
          {placeholder}
        </label>
      )}

      {error && (
        <FieldError
          className={cn(
            variant === 'default' &&
              'absolute w-[400px] -translate-x-1/14 left-0',
            classNames?.error,
          )}
          message={error}
        />
      )}
    </div>
  );
}
