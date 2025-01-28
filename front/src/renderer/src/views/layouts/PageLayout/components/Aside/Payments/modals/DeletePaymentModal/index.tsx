import DeleteModal from '@renderer/views/modals/DeleteModal';
import useDeletePaymentModal from './useDeletePaymentModal';

interface DeletePaymentModalProps {
  paymentId: string;
  onClose(): void;
  onConfirm(): void;
}

export default function DeletePaymentModal({
  onClose,
  onConfirm,
  paymentId,
}: DeletePaymentModalProps) {
  const { handleConfirmDelete } = useDeletePaymentModal({
    onSuccess: () => {
      onClose();
      onConfirm();
    },
    paymentId,
  });

  return (
    <DeleteModal
      answer="Tem certeza que deseja excluir esse pagamento?"
      description="Essa ação não poderá ser desfeita."
      onClose={onClose}
      open
      onConfirm={handleConfirmDelete}
    />
  );
}
