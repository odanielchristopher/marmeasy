import { useParams } from 'react-router';

import { useOrder } from '@app/hooks/orders/useOrder';

type Params = {
  orderId: string;
};

export function useEditOrderController() {
  const { orderId } = useParams<Params>();

  const { order, isLoading } = useOrder(orderId!);

  return {
    order,
    isLoading,
  };
}
