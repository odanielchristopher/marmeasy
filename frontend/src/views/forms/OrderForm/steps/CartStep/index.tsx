import { UseFieldArrayReturn } from 'react-hook-form';

import { formatCurrency } from '@app/utils/formatCurrency';
import { StepperNextButton } from '@views/components/app/Stepper';

import { Cart } from '../../components/Cart';
import { OrderFormData } from '../../useOrderFormController';

import { useCartStepController } from './useCartStepController';

interface ICartStep {
  cartControl: UseFieldArrayReturn<OrderFormData>;
}

export function CartStep({ cartControl }: ICartStep) {
  const { amount, hasItems, handleNextStep } =
    useCartStepController(cartControl);

  return (
    <div className="flex-1 flex flex-col space-y-4">
      <Cart items={cartControl} />

      <div className="flex justify-between items-center">
        <div className="flex-1/2">
          {!hasItems && (
            <span className="text-base text-gray-600 dark:text-gray-500">
              Seu carrinho está <br /> vazio
            </span>
          )}

          {hasItems && (
            <div>
              <span className="block text-base text-gray-600 dark:text-gray-500">
                Total
              </span>
              <strong className="text-lg font-semibold text-gray-800 tracking-[-1px] dark:text-foreground">
                {formatCurrency(amount)}
              </strong>
            </div>
          )}
        </div>

        <StepperNextButton
          type="button"
          className="flex-1/2 h-12"
          onClick={handleNextStep}
          disabled={!hasItems}
        />
      </div>
    </div>
  );
}
