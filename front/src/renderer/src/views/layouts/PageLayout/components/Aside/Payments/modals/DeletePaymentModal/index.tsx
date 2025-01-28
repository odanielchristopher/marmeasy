import { Client } from '@renderer/app/entities/Client';
import { Payment } from '@renderer/app/entities/Payment';
import DeleteModal from '@renderer/views/modals/DeleteModal';
import useDeletePaymentModal from './useDeletePaymentModal';

interface DeletePaymentModalProps {
  client: Client | null;
  payment: Payment | null;
  onClose(): void;
  onConfirm(): void;
}

export default function DeletePaymentModal({
  payment,
  client,
  onClose,
  onConfirm,
}: DeletePaymentModalProps) {
  const { handleConfirmDelete } = useDeletePaymentModal({
    client,
    payment,
    onSuccess: () => {
      onClose();
      onConfirm();
    },
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
