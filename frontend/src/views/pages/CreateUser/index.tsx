import { Button } from '@views/components/ui/Button';
import { FieldError } from '@views/components/ui/FieldError';
import { Input } from '@views/components/ui/Input';

import { useCreateUserController } from './useCreateUserController';

export function CreateUser() {
  const { form, formState, handleSubmit } = useCreateUserController();

  return (
    <form className="w-full max-w-[400px] mx-auto" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div className="space-y-2">
          <Input placeholder="Nome" {...form.register('name')} />
          {formState.errors.name?.message && (
            <FieldError message={formState.errors.name?.message} />
          )}
        </div>
        <div className="space-y-2">
          <Input placeholder="CEP" {...form.register('cep')} />
          {formState.errors.cep?.message && (
            <FieldError message={formState.errors.cep?.message} />
          )}
        </div>
        <div className="space-y-2">
          <Input placeholder="Endereço" {...form.register('address')} />
          {formState.errors.address?.message && (
            <FieldError message={formState.errors.address?.message} />
          )}
        </div>
      </div>

      <Button className="w-full mt-6" disabled={!formState.isValid}>
        Enviar
      </Button>
    </form>
  );
}
