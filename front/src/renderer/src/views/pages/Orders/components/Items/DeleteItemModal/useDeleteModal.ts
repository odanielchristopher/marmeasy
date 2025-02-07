interface DeleteModalProps {
  onClose(): void;
  index: number;
  setOrderDetails: (details: any) => void;
  orderDetails: any;
}

export function useDeleteModal( {index, onClose, setOrderDetails, orderDetails} : DeleteModalProps) {
  function handleConfirmDelete() {
    const newOrderDetails = orderDetails.filter((_: any, i: number) => i !== index);
    setOrderDetails(newOrderDetails);
    onClose();
  }

  return {
    handleConfirmDelete,
  };
}
