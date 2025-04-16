import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker } from '@views/components/app/DatePicker';
import { StepperPreviousButton } from '@views/components/app/Stepper';
import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';
import { Select } from '@views/components/ui/Select';

import { FormData } from '../..';

export function DataStep() {
  const form = useFormContext<FormData>();

  return (
    <div>
      <div className="space-y-3">
        <Input
          placeholder="Nome do cliente*"
          {...form.register('dataStep.customer.name')}
          error={form.formState.errors.dataStep?.customer?.name?.message}
        />

        <Controller
          control={form.control}
          name="dataStep.orderType"
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Tipo do pedido*"
              onChange={onChange}
              value={value}
              error={form.formState.errors.dataStep?.orderType?.message}
              options={[
                {
                  value: 'BREAKFAST',
                  label: 'Café da manhã',
                },
                {
                  value: 'LUNCH',
                  label: 'Almoço',
                },
                {
                  value: 'DINNER',
                  label: 'Jantar',
                },
              ]}
            />
          )}
        />

        <DatePicker />
      </div>

      <footer className="flex justify-between items-center gap-3 mt-6">
        <StepperPreviousButton
          size="default"
          className="flex-1/2 bg-transparent border border-foreground"
        />

        <Button className="flex-1/2" type="submit">
          Fechar pedido
        </Button>
      </footer>
    </div>
  );
}
