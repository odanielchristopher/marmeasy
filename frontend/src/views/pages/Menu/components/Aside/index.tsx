import { cn } from '@app/lib/utils';
import { Button } from '@views/components/ui/Button';

import { useAsideController } from './useAsideController';

interface IAsideProps {
  currentSession: string;
}

export function Aside({ currentSession }: IAsideProps) {
  const { sessions } = useAsideController();

  return (
    <aside className="h-full bg-white dark:bg-card flex-shrink-0 rounded-2xl border-border-muted md:sticky md:top-[120px] md:w-80 md:border md:p-5">
      <span className="font-medium text-muted-foreground">Sessões</span>

      <div className="my-4 h-px w-8 bg-border" />

      <div className="flex gap-2 overflow-visible md:flex-col">
        {sessions.map(({ id, label, icon: Icon, handler }) => (
          <Button
            key={id}
            type="button"
            className={cn(
              'justify-start h-12 border border-transparent',
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
