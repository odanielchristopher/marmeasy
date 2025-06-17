import { NotebookTextIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import { PageHeader } from '@views/components/app/PageHeader';
import { Button } from '@views/components/ui/Button';
import { OrderForm } from '@views/forms/OrderForm';

export function NewOrder() {
  const navigate = useNavigate();

  return (
    <div className="h-full pt-7 px-4 md:px-6 flex flex-col">
      <PageHeader
        title="Novo pedido"
        icon={NotebookTextIcon}
        classNames={{
          rootContainer: 'max-w-full flex items-center justify-between',
        }}
      >
        <Button type="button" variant="link" onClick={() => navigate(-1)}>
          Cancelar pedido
        </Button>
      </PageHeader>

      <main className="mt-11 flex-1">
        <OrderForm
          onSubmit={(orderFormData) => console.log({ orderFormData })}
          submitButtonLabel="Fechar pedido"
        />
      </main>
    </div>
  );
}
