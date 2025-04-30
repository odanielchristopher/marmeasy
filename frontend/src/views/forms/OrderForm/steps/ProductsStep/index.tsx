import { StepperNextButton } from '@views/components/app/Stepper';
import { FieldError } from '@views/components/ui/FieldError';

import { Cart } from './components/Cart';
import { Product } from './components/Product';
import { useProductsStepController } from './useProductsStepController';

export function ProductsStep() {
  const {
    products,
    addedProductIds,
    amount,
    errors,
    hasItems,
    cartItems,
    handleNextStep,
    handleAddToCart,
  } = useProductsStepController();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ul className="flex-1 overflow-y-auto mt-6 pb-5 scrollbar-thin space-y-3">
        {products.map((product) => (
          <li className="flex gap-4 relative h-24" key={product.id}>
            <Product
              {...product}
              onAdd={() => handleAddToCart(product)}
              isDisabled={addedProductIds.has(product.id)}
            />
          </li>
        ))}
      </ul>

      {errors.productsStep?.items?.message && (
        <div className="w-full flex justify-center">
          <FieldError message={errors.productsStep.items.message} />
        </div>
      )}

      <footer className="mt-5">
        <Cart items={cartItems} />

        <div className="flex justify-between gap-4 items-center pt-6">
          <div className="flex-1/2">
            {!hasItems && (
              <span className="text-base text-gray-600 dark:text-gray-500">
                Seu pedido está <br /> vazio
              </span>
            )}

            {hasItems && (
              <div>
                <span className="block text-base text-gray-600 dark:text-gray-500">
                  Total
                </span>
                <strong className="text-lg font-semibold text-gray-800 dark:text-foreground">
                  R$ {amount},00
                </strong>
              </div>
            )}
          </div>

          <StepperNextButton
            type="button"
            className="flex-1/2 h-12"
            onClick={handleNextStep}
          />
        </div>
      </footer>
    </div>
  );
}
