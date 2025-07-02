import { Modal } from '@views/components/ui/Modal';
import { PaymentForm } from '@views/forms/PaymentForm';

interface INewPaymentModalProps {
  open: boolean;
  onClose(): void;
}

export function NewPaymentModal({ open, onClose }: INewPaymentModalProps) {
  return (
    <Modal open={open} title="Novo pagamento" onClose={onClose}>
      <PaymentForm
        buttonLabel="Criar pagamento"
        onSubmit={(formData) => console.log(formData)}
      />
    </Modal>
  );
}
