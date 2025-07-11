import { Controller } from 'react-hook-form';

import { Combobox } from '@views/components/app/ComboBox';
import { DatePickerInput } from '@views/components/app/DatePickerInput';
import { Button } from '@views/components/ui/Button';
import { InputCurrency } from '@views/components/ui/InputCurrency';
import { Select } from '@views/components/ui/Select';
import { Textarea } from '@views/components/ui/Textarea';

import { PaymentFormData } from './schema';
import { usePaymentFormController } from './usePaymentFormController';

interface IPaymentFormProps {
  defaultValues?: PaymentFormData;
  onSubmit(formData: PaymentFormData): Promise<void> | void;
  isLoading?: boolean;
  buttonLabel: string;
}

export function PaymentForm({
  buttonLabel,
  defaultValues,
  isLoading,
  onSubmit,
}: IPaymentFormProps) {
  const {
    form,
    customers,
    isLoadingCustomers,
    handleSearchCustomerTerm,
    handleSubmit,
  } = usePaymentFormController({
    defaultValues,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-ful flex flex-col items-center max-sm:mb-12">
        <span className="text-gray-600 text-sm tracking-[-0.5px]">
          Valor do pagamento
        </span>
        <div className="flex items-center gap-2  max-w-[182px] border-b-2 border-gray-600">
          <span className="text-primary text-xl font-semibold tracking-[-0.5px]">
            R$
          </span>
          <Controller
            control={form.control}
            name="value"
            defaultValue="0"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                value={value}
                onChange={onChange}
                error={form.formState.errors.value?.message}
                classNames={{
                  error:
                    'max-sm:-translate-x-[36px] max-sm:w-[200px] sm:-translate-x-[120px]',
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-3 mt-8">
        <Controller
          control={form.control}
          name="customerId"
          render={({ field: { onChange, value } }) => (
            <Combobox
              options={customers.map((customer) => ({
                value: customer.id,
                label: customer.name,
              }))}
              onSelect={onChange}
              onNotFound={handleSearchCustomerTerm}
              isLoading={isLoadingCustomers}
              buttonLabel="Selecione um cliente*"
              defaultValue={value}
              placeholder="Procure pelo cliente"
              notFoundMessage="Cliente não encontrado"
              classNames={{
                trigger: 'w-full',
                popoverContent: 'z-100 w-[380px]',
              }}
              error={form.formState.errors.customerId?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Textarea
              placeholder="Descrição"
              className="resize-none max-h-[52px]"
              maxLength={90}
              onChange={onChange}
              value={value}
              error={form.formState.errors.description?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <Select
              placeholder="Tipo*"
              onChange={onChange}
              value={value}
              options={[
                {
                  value: 'CREDIT',
                  label: 'Cartão de crédito',
                },
                {
                  value: 'DEBIT',
                  label: 'Cartáo de débito',
                },
                {
                  value: 'CASH',
                  label: 'Dinheiro vivo',
                },
              ]}
              error={form.formState.errors.type?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              onChange={onChange}
              value={value}
              error={form.formState.errors.date?.message}
            />
          )}
        />
      </div>

      <Button
        type="submit"
        className="mt-6 w-full"
        isLoading={isLoading}
        disabled={isLoading || (defaultValues && !form.formState.isDirty)}
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
