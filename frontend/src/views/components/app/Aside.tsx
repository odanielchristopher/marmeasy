import React from 'react';

import { cn } from '@app/lib/utils';
import { Button } from '@views/components/ui/Button';

interface IAsideProps {
  currentOption: string;
  title: string;
  options: {
    id: string;
    label: string;
    icon: React.ElementType;
    iconType?: string;
    handler: () => void | Promise<void>;
  }[];
  classNames?: {
    root?: string;
    button?: string;
    icon?: string;
    label?: string;
    title?: string;
  };
}

export function Aside({
  title,
  currentOption,
  options,
  classNames,
}: IAsideProps) {
  return (
    <aside
      className={cn(
        'h-full bg-white dark:bg-card overflow-auto max-md:rounded-md flex-shrink-0 rounded-2xl border-border-muted md:sticky md:top-[120px] md:w-80 md:border md:p-5',
        classNames?.root,
      )}
    >
      <span
        className={cn(
          'font-medium text-muted-foreground max-md:hidden',
          classNames?.title,
        )}
      >
        {title}
      </span>

      <div className="my-4 h-px w-8 bg-border max-md:hidden" />

      <div className="flex gap-2 overflow-visible max-md:justify-around md:flex-col">
        {options.map(({ id, label, icon: Icon, iconType, handler }) => (
          <Button
            key={id}
            type="button"
            className={cn(
              'md:justify-start h-12 border border-transparent max-md:flex-1',
              classNames?.button,
              currentOption === id &&
                'bg-accent border border-gray-300 dark:border-white',
            )}
            variant="ghost"
            onClick={handler}
          >
            <Icon className={cn('size-5', classNames?.icon)} type={iconType} />
            <span className={cn('font-medium text-sm', classNames?.label)}>
              {label}
            </span>
          </Button>
        ))}
      </div>
    </aside>
  );
}
