import { Controller } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';
import { Select } from '@views/components/ui/Select';

import { ColorsDropdownInput } from '../../ColorsDropdownInput';

import { useCustomerFormController } from './useCustomerFormController';

const customerSchema = z.object({
  name: z.string().nonempty(),
  type: z.enum(['INDIVIDUAL', 'BUSINESS']),
  color: z.string().nonempty(),
  phone: z.string().or(z.number()).optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

interface ICustomerFormProps {
  defaultValues?: CustomerFormData;
  onSubmit(formData: CustomerFormData): Promise<void> | void;
}

export function CustomerForm({ defaultValues, onSubmit }: ICustomerFormProps) {
  const { form, handleSubmit } = useCustomerFormController({
    defaultValues,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-3">
        <Input
          placeholder="Nome*"
          {...form.register('name')}
          error={form.formState.errors.name?.message}
        />

        <Input
          placeholder="Telefone"
          {...form.register('phone')}
          error={form.formState.errors.phone?.message}
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

      <Button type="submit" className="mt-6 w-full">
        Criar cliente
      </Button>
    </form>
  );
}
