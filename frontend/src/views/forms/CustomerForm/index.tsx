import { Controller } from 'react-hook-form';

import { ColorsDropdownInput } from '@views/components/app/ColorsDropdownInput';
import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';
import { InputCurrency } from '@views/components/ui/InputCurrency';
import { InputFormatted } from '@views/components/ui/InputFormatted';
import { Select } from '@views/components/ui/Select';

import { CustomerFormData } from './schema';
import { useCustomerFormController } from './useCustomerFormController';

interface ICustomerFormProps {
  defaultValues?: CustomerFormData;
  onSubmit(formData: CustomerFormData): Promise<void> | void;
  isLoading?: boolean;
  buttonLabel: string;
}

export function CustomerForm({
  defaultValues,
  isLoading,
  buttonLabel,
  onSubmit,
}: ICustomerFormProps) {
  const { form, handleSubmit } = useCustomerFormController({
    defaultValues,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-ful flex flex-col items-center">
        <span className="text-gray-600 text-sm tracking-[-0.5px]">
          Saldo inicial
        </span>
        <div className="flex items-center gap-2  max-w-[182px] border-b-2 border-gray-600">
          <span className="text-primary text-xl font-semibold tracking-[-0.5px]">
            R$
          </span>
          <Controller
            control={form.control}
            name="initialBalance"
            defaultValue="0"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                value={value}
                onChange={onChange}
                error={form.formState.errors.initialBalance?.message}
              />
            )}
          />
        </div>
      </div>
      <div className="space-y-3 mt-6">
        <Input
          placeholder="Nome*"
          {...form.register('name')}
          error={form.formState.errors.name?.message}
        />

        <Controller
          control={form.control}
          name="phone"
          render={({ field: { value, onChange } }) => (
            <InputFormatted
              placeholder="Telefone"
              type="tel"
              name="phone"
              value={value}
              format="(##) #####-####"
              onValueChange={(event) => onChange(event.value)}
              error={form.formState.errors.phone?.message}
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
                  value: 'INDIVIDUAL',
                  label: 'Cliente físico',
                },
                {
                  value: 'BUSINESS',
                  label: 'Cliente jurídico',
                },
              ]}
              error={form.formState.errors.type?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="color"
          render={({ field: { value, onChange } }) => (
            <ColorsDropdownInput
              placeholder="Cor*"
              onChange={onChange}
              value={value}
              error={form.formState.errors.color?.message}
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
