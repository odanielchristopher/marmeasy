import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { useCreateOrder } from '@app/hooks/orders/useCreateOrder';
import { OrderFormData } from '@views/forms/OrderForm/useOrderFormController';

export function useNewOrderController() {
  const navigate = useNavigate();
  const { createOrder, isLoading } = useCreateOrder();

  async function handleSubmit(orderFormData: OrderFormData) {
    const { cartStep, dataStep } = orderFormData;

    try {
      await createOrder({
        customerId: dataStep.customerId,
        date: dataStep.date.toISOString(),
        type: dataStep.orderType,
        items: cartStep.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      });

      toast.success('Pedido criado com sucesso!');

      navigate(-1);
    } catch {
      toast.error('Ocorreu um erro ao criar o pedido!');
    }
  }

  return {
    isLoading,
    navigate,
    handleSubmit,
  };
}
