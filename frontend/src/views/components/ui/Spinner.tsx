import { cn } from '@app/lib/utils';

interface ISpinnerProps {
  className?: string;
}

export function Spinner({ className }: ISpinnerProps) {
  return (
    <div className="absolute z-10 inset-0 flex items-center justify-center">
      <div
        className={cn(
          'w-10 h-10 rounded-full border-4 border-r-primary dark:border-r-white animate-spin',
          className,
        )}
      />
    </div>
  );
}
