import { Users } from 'lucide-react';

export function Customers() {
  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <header className=" max-w-[280px] md:max-w-full">
        <div className="flex items-center gap-2 text-gray-800 dark:text-foreground">
          <Users className="size-8" />
          <h2 className="text-2xl font-semibold tracking-[-1px]">Clientes</h2>
        </div>

        <p className="mt-2 text-gray-600 dark:text-muted-foreground text-base tracking-[-0.5px]">
          Gerencie os clientes do seu estabelecimento
        </p>
      </header>

      <main />
    </div>
  );
}
