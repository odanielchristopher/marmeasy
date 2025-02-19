import { Expense } from '@renderer/app/entities/Expense';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import { Modal } from '../../../../components/Modal';
import ExpenseForm from '../../ExpenseForm';
import DeleteExpenseModal from '../DeleteExpenseModal';
import { StyledDeleteButton } from './styles';
import useEditExpenseModal from './useEditExpenseModal';

interface EditExpenseModalProps {
  open: boolean;
  onClose(): void;
  onSuccess?(): void;
  expense: Expense | null;
}

export default function EditExpenseModal({
  open,
  expense,
  onClose,
  onSuccess,
}: EditExpenseModalProps) {
  const {
    isLoading,
    isOpenDeleteExpenseModal,
    handleSubmit,
    handleCloseDeleteExpenseModal,
    handleOpenDeleteExpenseModal,
  } = useEditExpenseModal({ onSuccess, expenseId: expense!.id });

  if (isOpenDeleteExpenseModal) {
    return (
      <DeleteExpenseModal
        expense={expense}
        onClose={handleCloseDeleteExpenseModal}
        onConfirm={() => {
          onSuccess?.();
        }}
      />
    );
  }

  return (
    <Modal.Root
      open={open}
      onClose={onClose}
      title="Novo gasto"
      action={
        <StyledDeleteButton
          type="button"
          onClick={handleOpenDeleteExpenseModal}
        >
          <DeleteIcon />
        </StyledDeleteButton>
      }
    >
      <ExpenseForm
        buttonLabel="Adicionar gasto"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        expense={expense}
      />
    </Modal.Root>
  );
}
