import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@app/lib/utils';
import { Button } from '@views/components/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@views/components/ui/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@views/components/ui/Popover';

import { FieldError } from '../ui/FieldError';
import { Spinner } from '../ui/Spinner';

interface IComboBoxProps {
  options: {
    value: string;
    label: string;
  }[];
  defaultValue?: string;
  buttonLabel?: string;
  placeholder?: string;
  isLoading?: boolean;
  notFoundMessage?: string;
  onSelect?(value: string): void;
  onNotFound?(search: string): void;
  classNames?: {
    trigger?: string;
    popoverContent?: string;
    spinner?: string;
    item?: string;
  };
  error?: string;
}

export function Combobox({
  options,
  buttonLabel,
  placeholder,
  defaultValue,
  isLoading,
  notFoundMessage,
  classNames,
  error,
  onSelect,
  onNotFound,
}: IComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? '');
  const [searchTerm, setSearchTerm] = useState('');

  function handleValue(newValue: string) {
    setValue(newValue === value ? '' : newValue);
    onSelect?.(newValue === value ? '' : newValue);
    setOpen(false);
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (!isLoading && searchTerm && filteredOptions.length === 0) {
      onNotFound?.(searchTerm);
    }
  }, [searchTerm, filteredOptions, isLoading, onNotFound]);

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-[200px] justify-between dark:bg-accent border-gray-500 dark:border-accent focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-white relative pt-5',
              classNames?.trigger,
            )}
          >
            <span
              className={cn(
                'absolute z-10 top-[26px] -translate-y-1/2 left-3 text-muted-foreground font-normal text-base pointer-events-none transition-all',
                value && 'text-xs top-2 left-[13px] translate-y-0',
              )}
            >
              {buttonLabel ?? 'Escolha a opção'}
            </span>

            <span
              className={cn(
                'text-muted-foreground text-sm font-normal',
                value && 'text-gray-800 dark:text-foreground',
              )}
            >
              {value && options.find((option) => option.value === value)?.label}
            </span>

            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {!isLoading && (
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              )}

              {isLoading && <Spinner />}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'p-0 w-full scrollbar-thin',
            classNames?.popoverContent,
          )}
        >
          <Command className="bg-white dark:bg-card w-full">
            <CommandInput
              className="h-[48px]"
              onValueChange={(term) => setSearchTerm(term)}
              placeholder={placeholder ?? 'Pequise pela opção...'}
            />
            <CommandList className="scrollbar-thin">
              <CommandEmpty>
                {isLoading && (
                  <div className="w-full h-20 grid place-items-center">
                    <Spinner
                      className={cn('w-[200px] p-0', classNames?.spinner)}
                    />
                  </div>
                )}
                {!isLoading && (
                  <span className="text-muted-foreground">
                    {notFoundMessage ?? 'Opção não encontrada!'}
                  </span>
                )}
              </CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => handleValue(option.value)}
                    className={cn('h-12 text-sm', classNames?.item)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <FieldError message={error} />}
    </div>
  );
}
