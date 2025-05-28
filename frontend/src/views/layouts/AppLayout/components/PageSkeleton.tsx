import { Skeleton } from '@views/components/ui/Skeleton';

export function PageSkeleton() {
  return (
    <div className="w-full h-full py-7 px-4 md:px-6">
      <div className="max-w-[280px] md:max-w-full">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8" />

          <Skeleton className="h-8 w-40" />
        </div>

        <Skeleton className="mt-2 h-6 w-100 rounded-[4px]" />
      </div>
    </div>
  );
}
