import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@app/lib/utils';

import { Button } from './Button';

const searchSchema = z.object({
  searchTerm: z.string(),
});

export type SearchTermFormData = z.infer<typeof searchSchema>;

interface IInputSearchProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onSearch(formData: SearchTermFormData): void;
}

export function InputSearch({
  placeholder,
  className,
  value,
  onSearch,
}: IInputSearchProps) {
  const { formState, ...form } = useForm<SearchTermFormData>({
    defaultValues: {
      searchTerm: value ?? '',
    },
    resolver: zodResolver(searchSchema),
  });

  useEffect(() => {
    if (!formState.isDirty) {
      onSearch(form.getValues());
    }
  }, [formState.isDirty, form, onSearch]);

  const handleSubmit = form.handleSubmit((formData) => {
    onSearch(formData);
  });

  return (
    <div
      className={cn(
        'relative flex items-center focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] w-full',
        className,
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border px-3 py-1 text-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-11',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'bg-white w-full rounded-lg border border-gray-300 dark:border-accent h-[52px] text-gray-700 dark:text-foreground',
        )}
        {...form.register('searchTerm')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="absolute z-1 inset-y-px right-px flex items-center bg-white dark:bg-[#141414] rounded-r-md">
        <div className="ml-3 h-full w-px bg-muted" />
        <Button
          type="button"
          className="min-w-14 rounded-l-none"
          variant="ghost"
          onClick={handleSubmit}
        >
          <Search className="size-5" />
          <span className="text-base font-normal max-sm:hidden">Buscar</span>
        </Button>
      </div>
    </div>
  );
}
