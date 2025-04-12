import { Order } from '@views/components/Order';
import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';
import { Spinner } from '@views/components/ui/Spinner';

import { useCreateUserController } from './useCreateUserController';

export function CreateUser() {
  const { form, formState, handleSubmit } = useCreateUserController();

  function handleDefaultValues() {
    form.reset(form.getValues());
  }

  return (
    <main className="w-full max-w-[532px] mx-auto px-4 pt-10">
      <h2 className="text-2xl font-semibold tracking-[-1px]">
        Crie seu usuário
      </h2>

      <form
        className="w-full p-6 rounded-xl mx-auto border bg-accent dark:bg-card mt-3 relative"
        onSubmit={handleSubmit}
      >
        {formState.isLoading && <Spinner />}

        <div className="space-y-3">
          <Input
            placeholder="Nome"
            {...form.register('name')}
            error={formState.errors.name?.message}
          />

          <Input
            placeholder="CEP"
            {...form.register('cep')}
            error={formState.errors.cep?.message}
          />

          <Input
            placeholder="Endereço"
            {...form.register('address')}
            error={formState.errors.address?.message}
          />
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            type="button"
            className="flex-1"
            disabled={!formState.isValid || !formState.isDirty}
            onClick={handleDefaultValues}
          >
            Salvar
          </Button>

          <Button
            type="submit"
            className="flex-1"
            disabled={!formState.isValid}
          >
            Enviar
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => form.clearErrors()}
          >
            Limpar erros
          </Button>

          <Button
            type="button"
            onClick={() => form.setFocus('name')}
            variant="outline"
            size="sm"
          >
            Focar no nome
          </Button>

          <Button
            type="button"
            onClick={() => form.setFocus('name')}
            variant="outline"
            size="sm"
          >
            Validar campos
          </Button>

          <Button
            type="button"
            onClick={() => form.setFocus('name')}
            size="sm"
            variant="destructive"
          >
            teste
          </Button>
          <Button
            type="button"
            onClick={() => form.setFocus('name')}
            size="sm"
            variant="secondary"
          >
            teste
          </Button>
          <Button
            type="button"
            onClick={() => form.setFocus('name')}
            size="sm"
            variant="ghost"
          >
            teste
          </Button>
        </div>
      </form>

      <div className="mt-10">
        <Order
          order={{
            date: '12/12/12',
            quantity: 2,
            total: 40,
            customer: {
              id: '123',
              name: 'Daniel',
              type: 'BUSINESS',
            },
          }}
        />
      </div>
    </main>
  );
}
