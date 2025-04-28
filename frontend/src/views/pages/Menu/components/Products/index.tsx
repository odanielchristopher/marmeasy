import { PlusCircleIcon, SoupIcon } from 'lucide-react';

import { products } from '@app/mocks/products';
import { Button } from '@views/components/ui/Button';

import { ProductCard } from './components/ProductCard';

export function Products() {
  return (
    <div className="pt-3">
      <header className="mb-5 flex gap-3 items-center">
        <div className="flex items-center justify-center p-3 border border-gray-300 dark:border-accent bg-white dark:bg-card rounded-sm">
          <SoupIcon />
        </div>
        <h4 className="text-xl font-medium tracking-[-0.5px]">Produtos</h4>
      </header>

      <div>
        <Button type="button" variant="outline" className="h-[42px] bg-white">
          <PlusCircleIcon />
          Novo produto
        </Button>
      </div>

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 ">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => console.log({ product })}
          />
        ))}
      </div>
    </div>
  );
}
