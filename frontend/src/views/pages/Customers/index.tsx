import { Users } from 'lucide-react';

export function Customers() {
  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <header className="text-gray-800 max-w-[280px] md:max-w-full dark:text-accent-foreground">
        <div className="flex items-center gap-2">
          <Users className="size-8" />
          <h2 className="text-2xl font-semibold tracking-[-1px]">Clientes</h2>
        </div>

        <p className="mt-2 text-gray-600 text-base tracking-[-0.5px]">
          Gerencie os clientes do seu estabelecimento
        </p>
      </header>

      <main />
    </div>
  );
}
