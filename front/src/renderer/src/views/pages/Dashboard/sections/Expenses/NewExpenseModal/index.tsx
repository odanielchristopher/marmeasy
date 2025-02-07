import { Modal } from '../../../components/Modal';
import ExpenseForm from '../ExpenseForm';
import { ExpenseFormSchema } from '../ExpenseForm/useExpenseForm';

interface NewExpenseModalProps {
  open: boolean;
  onClose(): void;
}

export default function NewExpenseModal({ onClose, open }: NewExpenseModalProps) {
  return (
    <Modal.Root open={open} onClose={onClose} title="Novo gasto">
      <ExpenseForm
        buttonLabel="Adicionar gasto"
        onSubmit={async (data: ExpenseFormSchema) => console.log({ data })}
      />
    </Modal.Root>
  );
}
