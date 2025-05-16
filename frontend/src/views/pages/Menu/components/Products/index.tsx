import { PlusCircleIcon, SoupIcon } from 'lucide-react';

import { Button } from '@views/components/ui/Button';

import { EditProductModal } from './components/EditProductModal';
import { NewProductModal } from './components/NewProductModal';
import { ProductCard } from './components/ProductCard';
import { useProductsController } from './useProductsController';

export function Products() {
  const {
    products,
    isOpenEditProductModal,
    isOpenNewProductModal,
    productBeenEdited,
    handleOpenNewProductModal,
    handleCloseNewProductModal,
    handleOpenEditProductModal,
    handleCloseEditProductModal,
  } = useProductsController();

  return (
    <div className="pt-3">
      {isOpenNewProductModal && (
        <NewProductModal open onClose={handleCloseNewProductModal} />
      )}

      {isOpenEditProductModal && (
        <EditProductModal
          open
          product={productBeenEdited}
          onClose={handleCloseEditProductModal}
        />
      )}

      <header className="mb-5 md:pl-8 flex gap-3 items-center">
        <div className="flex items-center justify-center p-3 border border-gray-300 dark:border-accent bg-white dark:bg-card rounded-sm">
          <SoupIcon />
        </div>
        <h4 className="text-xl font-medium tracking-[-0.5px]">Produtos</h4>
      </header>

      <div className="md:px-8">
        <Button
          type="button"
          variant="outline"
          className="h-[42px] bg-white"
          onClick={handleOpenNewProductModal}
        >
          <PlusCircleIcon />
          Novo produto
        </Button>
      </div>

      <div className="pt-6 md:pl-8 md:pr-4 flex-1 overflow-y-auto scrollbar-thin grid grid-cols-1 md:pb-6 lg:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => handleOpenEditProductModal(product)}
          />
        ))}
      </div>
    </div>
  );
}
