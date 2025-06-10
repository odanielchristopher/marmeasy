import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@app/lib/utils';

interface IToggleGroupProps {
  onChange?(value: 'asc' | 'desc'): void;
}

export function ToggleGroup({ onChange }: IToggleGroupProps) {
  const [selected, setSelected] = useState<'asc' | 'desc'>('desc');

  function handleSelect(value: 'asc' | 'desc') {
    setSelected(value);
    onChange?.(value);
  }

  return (
    <div className="flex gap-4">
      <button
        type="button"
        className={cn(
          'flex gap-3 bg-transparent border border-transparent px-4 py-2 rounded-md h-[52px] items-center transition-colors cursor-pointer',
          selected === 'asc' &&
            'bg-white border-gray-400 dark:bg-card dark:border-accent',
        )}
        onClick={() => handleSelect('asc')}
      >
        <ArrowUpNarrowWide className="size-5" />

        <span className="text-sm">Mais recentes</span>
      </button>

      <button
        type="button"
        className={cn(
          'flex gap-3 bg-transparent border border-transparent px-4 py-2 rounded-md h-[52px] items-center transition-colors cursor-pointer',
          selected === 'desc' &&
            'bg-white border-gray-400 dark:bg-card dark:border-accent',
        )}
        onClick={() => handleSelect('desc')}
      >
        <ArrowDownWideNarrow className="size-5" />

        <span className="text-sm">Mais antigos</span>
      </button>
    </div>
  );
}
