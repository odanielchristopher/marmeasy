import { Controller } from 'react-hook-form';

import { Button } from '@views/components/ui/Button';
import { InputCurrency } from '@views/components/ui/InputCurrency';

import { CartItem } from '../../Cart';

import { useEditItemFormController } from './useEditItemFormController';

export interface IEditItemFormProps {
  item: CartItem;
  onSubmit(item: CartItem): void;
}

export function EditItemForm({ item, onSubmit }: IEditItemFormProps) {
  const { form, errors, handleSubmit } = useEditItemFormController(
    item,
    onSubmit,
  );

  return (
    <div>
      <div className="space-y-2 min-h-15">
        <strong className="block font-medium text-lg tracking-[-0.5px]">
          Marmita Vegetariana
        </strong>

        <span className="block text-base tracking-[-0.5px] text-muted-foreground">
          Pizza de Quatro Queijos com borda tradicional
        </span>
      </div>

      <div className="mt-10">
        <div className="space-y-3">
          <span className="block">Valor do produto</span>

          <Controller
            control={form.control}
            name="newPrice"
            defaultValue={0}
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                variant="normalInput"
                prefix="R$ "
                maxLength={10}
                value={value}
                placeholder="Valor"
                onChange={(number) => onChange(number)}
                error={errors.newPrice?.message}
              />
            )}
          />
        </div>

        <Button className="w-full mt-6" onClick={handleSubmit} type="button">
          Atualizar valor
        </Button>
      </div>
    </div>
  );
}
