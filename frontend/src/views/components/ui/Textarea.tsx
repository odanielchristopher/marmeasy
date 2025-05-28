import * as React from 'react';

import { cn } from '@app/lib/utils';

import { FieldError } from './FieldError';

function Textarea({
  className,
  error,
  name,
  id,
  placeholder,
  ...props
}: React.ComponentProps<'textarea'> & { error?: string }) {
  const inputId = id ?? name;

  return (
    <div className="relative w-full">
      <textarea
        data-slot="textarea"
        placeholder=" "
        id={inputId}
        className={cn(
          // Base styling
          'w-full min-h-[4rem] resize-y rounded-md border border-gray-500 bg-white px-3 py-2 text-base text-gray-700 shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:border-accent dark:bg-input/30 dark:text-foreground',
          // Label behavior
          'pt-5 peer placeholder-shown:pt-2.5',
          // Error / state styles
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
          className,
        )}
        {...props}
      />

      <label
        htmlFor={inputId}
        className="pointer-events-none absolute left-[13px] top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm"
      >
        {placeholder}
      </label>

      {error && <FieldError message={error} />}
    </div>
  );
}

export { Textarea };
