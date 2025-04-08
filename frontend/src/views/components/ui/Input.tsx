import * as React from 'react';

import { cn } from '@app/lib/utils';

import { FieldError } from './FieldError';

interface IInputProps extends React.ComponentProps<'input'> {
  name: string;
  error?: string;
}

export function Input({
  id,
  name,
  placeholder,
  error,
  className,
  type,
  ...props
}: IInputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        type={type}
        data-slot="input"
        name={name}
        id={inputId}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border bg-gray-50 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pt-4 peer placeholder-shown:pt-0',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        placeholder=" "
        {...props}
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-muted-foreground peer-placeholder-shown:text-base peer-placeholder-shown:top-3 transition-all"
      >
        {placeholder}
      </label>

      {error && <FieldError message={error} />}
    </div>
  );
}
