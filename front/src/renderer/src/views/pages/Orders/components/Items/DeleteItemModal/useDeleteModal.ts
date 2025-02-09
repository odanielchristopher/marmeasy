import { OrderDetail } from '../ItemForm/useItemForm';

interface DeleteModalProps {
  onClose(): void;
  index: number;
  setOrderDetails: (details: any) => void;
  orderDetails: OrderDetail[];
}

export function useDeleteModal({
  index,
  onClose,
  setOrderDetails,
  orderDetails,
}: DeleteModalProps) {
  const detailItem = orderDetails[index];

  function handleConfirmDelete() {
    const newOrderDetails = orderDetails.filter(
      (_: any, i: number) => i !== index,
    );
    setOrderDetails(newOrderDetails);
    onClose();
  }

  return {
    detailItem,
    handleConfirmDelete,
  };
}
