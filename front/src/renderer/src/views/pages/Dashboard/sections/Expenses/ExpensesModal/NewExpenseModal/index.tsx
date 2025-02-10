import { Modal } from '../../../../components/Modal';
import ExpenseForm from '../../ExpenseForm';
import useNewExpenseModal from './useNewExpenseModal';

interface NewExpenseModalProps {
  open: boolean;
  onClose(): void;
  onSuccess?(): void;
}

export default function NewExpenseModal({
  open,
  onClose,
  onSuccess,
}: NewExpenseModalProps) {
  const { handleSubmit, isLoading } = useNewExpenseModal({ onSuccess });

  return (
    <Modal.Root open={open} onClose={onClose} title="Novo gasto">
      <ExpenseForm
        buttonLabel="Adicionar gasto"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal.Root>
  );
}
