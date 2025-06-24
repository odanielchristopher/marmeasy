import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

import { useOrder } from '@app/hooks/orders/useOrder';
import { useUpdateOrder } from '@app/hooks/orders/useUpdateOrder';
import { OrderFormData } from '@views/forms/OrderForm/useOrderFormController';

type Params = {
  orderId: string;
};

export function useEditOrderController() {
  const { orderId } = useParams<Params>();
  const navigate = useNavigate();

  const { order, isLoading } = useOrder(orderId!);

  const { isLoading: isUpdating, updateOrder } = useUpdateOrder();

  async function handleSubmit(orderFormData: OrderFormData) {
    const { cartStep, dataStep } = orderFormData;

    try {
      await updateOrder({
        id: orderId!,
        customerId: dataStep.customerId,
        date: dataStep.date.toISOString(),
        type: dataStep.orderType,
        items: cartStep.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      });

      toast.success('Alterações salvas com sucesso!');

      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao salvar alterações!');
    }
  }

  return {
    order,
    isLoading,
    isUpdating,
    navigate,
    handleSubmit,
  };
}
