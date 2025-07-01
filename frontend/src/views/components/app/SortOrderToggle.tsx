import React, { useState } from 'react';

import { cn } from '@app/lib/utils';

interface ISortOrderToggleProps {
  value?: 'asc' | 'desc';
  onChange?(value: 'asc' | 'desc'): void;
  options: {
    value: 'asc' | 'desc';
    label: string;
    icon: React.ElementType;
    className?: {
      base?: string;
      onSelected?: string;
    };
  }[];
}

export function SortOrderToggle({
  value: defaultValue,
  onChange,
  options,
}: ISortOrderToggleProps) {
  const [selected, setSelected] = useState<'asc' | 'desc'>(
    defaultValue ?? 'desc',
  );

  function handleSelect(value: 'asc' | 'desc') {
    setSelected(value);
    onChange?.(value);
  }

  return (
    <div className="flex gap-4">
      {/* <button
        type="button"
        className={cn(
          'flex gap-3 bg-transparent border border-transparent px-4 py-2 rounded-md h-[52px] items-center transition-colors cursor-pointer',
          selected === 'desc' &&
            'bg-white border-gray-400 dark:bg-card dark:border-accent',
        )}
        onClick={() => handleSelect('desc')}
      >
        <ArrowUpNarrowWide className="size-5" />

        <span className="text-sm">Mais recentes</span>
      </button>

      ArrowDownWideNarrow */}

      {options.map(({ value, icon: Icon, label, className }) => (
        <button
          key={value}
          type="button"
          className={cn(
            'flex gap-3 bg-transparent border border-transparent px-4 py-2 rounded-md h-[52px] items-center transition-colors cursor-pointer',
            selected === value &&
              'bg-white border-gray-400 dark:bg-card dark:border-accent',
            className?.base,
            selected === value && className?.onSelected,
          )}
          onClick={() => handleSelect(value)}
        >
          <Icon className="size-5" />

          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
}
