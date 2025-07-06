import { Modal } from '@views/components/ui/Modal';
import { PaymentForm } from '@views/forms/PaymentForm';

import { useNewPaymentModalController } from './useNewPaymentModalController';

interface INewPaymentModalProps {
  open: boolean;
  onClose(): void;
}

export function NewPaymentModal({ open, onClose }: INewPaymentModalProps) {
  const { handleSubmit, isLoading } = useNewPaymentModalController({
    onSuccess: onClose,
  });

  return (
    <Modal open={open} title="Novo pagamento" onClose={onClose}>
      <PaymentForm
        buttonLabel="Criar pagamento"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  );
}
