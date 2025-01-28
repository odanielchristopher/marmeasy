import Modal from '@renderer/views/components/Modal';
import PaymentForm from '../../PaymentForm';

import { Client } from '@renderer/app/entities/Client';
import useNewPaymentModal from './useNewPaymentModal';

interface NewPaymentModalProps {
  client: Client | null;
  open: boolean;
  onClose(): void;
}

export default function NewPaymentModal({
  open,
  client,
  onClose,
}: NewPaymentModalProps) {
  const { handleSubmit, isLoading } = useNewPaymentModal({
    onSuccess: onClose,
    client,
  });

  return (
    <Modal open={open} onClose={onClose} title="Novo pagamento">
      <div>
        <PaymentForm
          buttonLabel="Criar pagamento"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  );
}
