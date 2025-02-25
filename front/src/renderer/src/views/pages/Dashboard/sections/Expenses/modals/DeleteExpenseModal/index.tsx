import { Expense } from '@renderer/app/entities/Expense';

import DeleteModal from '@renderer/views/modals/DeleteModal';

import useDeleteExpenseModal from './useDeleteExpenseModal';

interface DeleteExpenseModalProps {
  expense: Expense | null;
  onClose(): void;
  onConfirm(): void;
}

export default function DeleteExpenseModal({
  expense,
  onClose,
  onConfirm,
}: DeleteExpenseModalProps) {
  const { handleConfirmDelete } = useDeleteExpenseModal({
    expense,
    onSuccess: () => {
      onClose();
      onConfirm();
    },
  });

  return (
    <DeleteModal
      answer="Tem certeza que deseja excluir esse gasto?"
      description="Essa ação não poderá ser desfeita e afetará o histórico."
      onClose={onClose}
      open
      onConfirm={handleConfirmDelete}
    />
  );
}
