import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@app/lib/utils';
import { ColorIcon } from '@views/assets/icons/ColorIcon';

// import { DropdownMenu } from '../ui/DropdownMenu'
import { FieldError } from '../ui/FieldError';

interface IColorsDropdownInputProps {
  className?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  onChange?(value: string): void;
}

type Color = {
  color: string;
  bg: string;
};

const colors: Color[] = [
  { color: '#FA5252', bg: '#FFF5F5' },
  { color: '#E64980', bg: '#FFF0F6' },
  { color: '#BE4BDB', bg: '#F8F0FC' },
  { color: '#7950F2', bg: '#F3F0FF' },
  { color: '#4C6EF5', bg: '#EDF2FF' },
  { color: '#228BE6', bg: '#E7F5FF' },
  { color: '#15AABF', bg: '#E3FAFC' },
  { color: '#12B886', bg: '#E6FCF5' },
  { color: '#40C057', bg: '#EBFBEE' },
  { color: '#82C91E', bg: '#F4FCE3' },
  { color: '#FAB005', bg: '#FFF9DB' },
  { color: '#FD7E14', bg: '#FFF4E6' },
];

export function ColorsDropdownInput({
  className,
  error,
  value,
  placeholder,
  onChange,
}: IColorsDropdownInputProps) {
  const [selectedColor, setSelectedColor] = useState<null | Color>(() => {
    if (!value) {
      return null;
    }

    return colors.find((c) => c.color === value) ?? null;
  });

  function handleSelect(color: Color) {
    setSelectedColor(color);
    onChange?.(color.color);
  }

  return (
    <div>
      <RdxDropdownMenu.Root>
        <RdxDropdownMenu.Trigger asChild>
          <button
            type="button"
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 outline-none focus:border-gray-800 transition-all text-left relative',
              'dark:bg-input/30 dark:border-accent dark:text-muted-foreground',
              error && '!border-red-900',
              selectedColor && 'dark:text-foreground',
              className,
            )}
          >
            {placeholder ?? 'Cor'}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {!selectedColor && (
                <ChevronDownIcon className="w-6 h-6 text-gray-800 dark:text-foreground" />
              )}

              {selectedColor && (
                <ColorIcon bg={selectedColor.bg} color={selectedColor.color} />
              )}
            </div>
          </button>
        </RdxDropdownMenu.Trigger>

        <RdxDropdownMenu.Portal>
          <RdxDropdownMenu.Content
            className={cn(
              'z-[99] grid grid-cols-4',
              'rounded-2xl p-2 bg-white z-[99] border border-white space-y-1 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
              'dark:bg-card dark:border-accent',
            )}
          >
            {colors.map((color) => (
              <RdxDropdownMenu.Item
                key={color.color}
                onSelect={() => handleSelect(color)}
                className="min-h-11 outline-none flex items-center py-2 px-4 text-gray-800 data-[highlighted]:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                <ColorIcon bg={color.bg} color={color.color} />
              </RdxDropdownMenu.Item>
            ))}
          </RdxDropdownMenu.Content>
        </RdxDropdownMenu.Portal>
      </RdxDropdownMenu.Root>

      {error && <FieldError message={error} />}
    </div>
  );
}
