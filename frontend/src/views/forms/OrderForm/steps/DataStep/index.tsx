import { Controller } from 'react-hook-form';

import { useCustomers } from '@app/hooks/useCustomers';
import { Combobox } from '@views/components/app/ComboBox';
import { DatePickerInput } from '@views/components/app/DatePickerInput';
import { StepperPreviousButton } from '@views/components/app/Stepper';
import { Button } from '@views/components/ui/Button';
import { Select } from '@views/components/ui/Select';

import { useDataStepController } from './useDataStepController';

export function DataStep({ buttonLabel }: { buttonLabel: string }) {
  const { customers, form, isLoadingCustomers, handleSearchCustomerTerm } =
    useDataStepController({
      loadCustomers: useCustomers,
    });

  return (
    <div>
      <div className="px-3 mt-4 mb-8 md:hidden">
        <strong className="font-medium text-muted-foreground">
          Mais informações
        </strong>
      </div>

      <div className="space-y-3">
        <Controller
          control={form.control}
          name="dataStep.customerId"
          render={({ field: { onChange, value } }) => (
            <Combobox
              options={customers.map((customer) => ({
                value: customer.id,
                label: customer.name,
              }))}
              onSelect={onChange}
              onSearch={handleSearchCustomerTerm}
              isLoading={isLoadingCustomers}
              buttonLabel="Selecione um cliente"
              defaultValue={value}
              placeholder="Procure pelo cliente"
              notFoundMessage="Cliente não encontrado"
              classNames={{
                trigger: 'w-full bg-white dark:bg-accent',
              }}
              error={form.formState.errors.dataStep?.customerId?.message}
            />
          )}
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

        <Controller
          control={form.control}
          name="dataStep.date"
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              onChange={onChange}
              value={value}
              error={form.formState.errors.dataStep?.date?.message}
            />
          )}
        />
      </div>

      <footer className="flex justify-between items-center gap-3 mt-10">
        <StepperPreviousButton
          type="button"
          size="default"
          className="flex-1/2 bg-transparent border border-foreground"
        />

        <Button className="flex-1/2" type="submit">
          {buttonLabel}
        </Button>
      </footer>
    </div>
  );
}
