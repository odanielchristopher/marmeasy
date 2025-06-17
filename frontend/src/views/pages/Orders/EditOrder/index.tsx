import { NotebookTextIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import { NotFoundError } from '@views/components/app/NotFoundError';
import { PageHeader } from '@views/components/app/PageHeader';
import { Button } from '@views/components/ui/Button';
import { Skeleton } from '@views/components/ui/Skeleton';
import { OrderForm } from '@views/forms/OrderForm';

import { useEditOrderController } from './useEditOrderController';

export function EditOrder() {
  const { order, isLoading } = useEditOrderController();
  const navigate = useNavigate();

  return (
    <div className="h-full pt-7 px-4 md:px-6">
      <PageHeader
        title="Editar pedido"
        icon={NotebookTextIcon}
        classNames={{
          rootContainer: 'max-w-full flex items-center justify-between',
        }}
      >
        <Button type="button" variant="link" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
      </PageHeader>

      <main className="mt-11">
        {isLoading && (
          <div className="flex justify-between">
            <Skeleton className="h-[52px] w-[600px]" />

            <Skeleton className="h-[300px] w-[400px]" />
          </div>
        )}

        {!order && !isLoading && (
          <NotFoundError
            image={{
              type: 'order',
            }}
            message="Não encontramos o pedido"
          />
        )}

        {order && !isLoading && (
          <OrderForm
            onSubmit={(orderFormData) => console.log({ orderFormData })}
            submitButtonLabel="Salvar alterações"
            defaultValues={{
              cartStep: {
                items: order?.items.map((item) => ({
                  name: item.product.name,
                  productId: item.product.id,
                  description: item.product.description,
                  imagePath: item.product.imageUrl,
                  quantity: item.quantity,
                  unitPrice: Number(item.unitPrice),
                })),
              },
              dataStep: {
                customerId: order.customer.id,
                orderType: order.type,
                date: new Date(order.date),
              },
            }}
          />
        )}
      </main>
    </div>
  );
}
