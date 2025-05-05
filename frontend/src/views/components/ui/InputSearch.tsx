import { Search } from 'lucide-react';

import { cn } from '@app/lib/utils';

interface IInputSearchProps {
  placeholder?: string;
  className?: string;
}

export function InputSearch({ placeholder, className }: IInputSearchProps) {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3" />
      <input
        name="search"
        type="text"
        placeholder={placeholder}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border px-3 py-1 text-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-11',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'bg-white w-full rounded-lg border border-gray-300 dark:border-accent h-[52px] text-gray-700 dark:text-foreground',
          className,
        )}
      />
    </div>
  );
}
