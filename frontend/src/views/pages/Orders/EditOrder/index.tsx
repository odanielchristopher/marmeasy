import { NotebookTextIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

import { orders } from '@app/mocks/orders';
import { PageHeader } from '@views/components/app/PageHeader';
import { Button } from '@views/components/ui/Button';
import { OrderForm } from '@views/forms/OrderForm';

type Params = {
  orderId: string;
};

export function EditOrder() {
  const { orderId } = useParams<Params>();

  const order = orders.find((ord) => ord.id === orderId);
  const navigate = useNavigate();

  if (!order) {
    return null;
  }

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
                unitPrice: item.unitPrice,
              })),
            },
            dataStep: {
              customerId: order.customer.id,
              orderType: order.type,
              date: new Date(order.date),
            },
          }}
        />
      </main>
    </div>
  );
}
