import { Skeleton } from '@views/components/ui/Skeleton';

export function CustomerSkeleton() {
  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <header className="max-w-[280px] md:max-w-full">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8" />

          <Skeleton className="h-8 w-40" />
        </div>

        <Skeleton className="mt-2 h-6 w-full max-w-100 rounded-[4px]" />
      </header>

      <main className="mt-10 flex max-md:flex-col gap-10">
        <aside className="flex md:flex-col gap-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-40" />
        </aside>

        <div>
          <header className="flex items-center gap-3">
            <Skeleton className="size-12" />

            <Skeleton className="h-8 w-50" />
          </header>
        </div>
      </main>
    </div>
  );
}
