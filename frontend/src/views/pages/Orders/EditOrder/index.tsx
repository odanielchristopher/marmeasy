import { NotebookTextIcon } from 'lucide-react';

import { NotFoundError } from '@views/components/app/NotFoundError';
import { PageHeader } from '@views/components/app/PageHeader';
import { Button } from '@views/components/ui/Button';
import { Skeleton } from '@views/components/ui/Skeleton';
import { OrderForm } from '@views/forms/OrderForm';

import { useEditOrderController } from './useEditOrderController';

export function EditOrder() {
  const { order, isLoading, isUpdating, navigate, handleSubmit } =
    useEditOrderController();

  return (
    <div className="h-full flex flex-col pt-7 px-4 md:px-6">
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

      <main className="mt-11 flex-1">
        {isLoading && !order && (
          <div className="flex justify-between gap-6">
            <div className="space-y-5 flex-1">
              <Skeleton className="h-[52px] w-full max-w-[600px]" />

              <div className="flex-1 overflow-y-auto scrollbar-thin grid grid-cols-1 md:pb-6 lg:grid-cols-2 gap-4">
                <Skeleton className="h-30 w-full" />
                <Skeleton className="h-30 w-full" />
                <Skeleton className="h-30 w-full" />
                <Skeleton className="h-30 w-full" />
              </div>
            </div>

            <Skeleton className="max-md:absolute bottom-0 right-0 left-0 w-full h-[100px] max-md:rounded-xl max-md:rounded-b-none md:h-[300px] md:w-[400px]" />
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

        {order && (
          <OrderForm
            onSubmit={handleSubmit}
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
            isLoading={isUpdating}
          />
        )}
      </main>
    </div>
  );
}
