import React from 'react';

import { cn } from '@app/lib/utils';
import { Button } from '@views/components/ui/Button';

interface IAsideProps {
  currentSession: string;
  title: string;
  sessions: {
    id: string;
    label: string;
    icon: React.ElementType;
    handler: () => void | Promise<void>;
  }[];
}

export function Aside({ title, currentSession, sessions }: IAsideProps) {
  return (
    <aside className="h-full bg-white dark:bg-card overflow-auto max-md:rounded-md flex-shrink-0 rounded-2xl border-border-muted md:sticky md:top-[120px] md:w-80 md:border md:p-5">
      <span className="font-medium text-muted-foreground max-md:hidden">
        {title}
      </span>

      <div className="my-4 h-px w-8 bg-border max-md:hidden" />

      <div className="flex gap-2 overflow-visible max-md:justify-around md:flex-col">
        {sessions.map(({ id, label, icon: Icon, handler }) => (
          <Button
            key={id}
            type="button"
            className={cn(
              'md:justify-start h-12 border border-transparent max-md:flex-1',
              currentSession === id &&
                'bg-accent border border-gray-300 dark:border-white',
            )}
            variant="ghost"
            onClick={handler}
          >
            <Icon className="size-5" />
            <span className="font-medium text-sm">{label}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
}
