import { Order } from '@renderer/app/entities/Order';
import { useState } from 'react';

export default function useDetailsOrder() {
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  const handleEditOrder = (order: Order) => {
    setOrderDetails(order);
    setIsEditOrderModalOpen(true);
  };

  const handleCloseEditOrderModal = () => {
    setIsEditOrderModalOpen(false);
  };

  return {
    isEditOrderModalOpen,
    orderDetails,
    handleEditOrder,
    handleCloseEditOrderModal,
  };
}
