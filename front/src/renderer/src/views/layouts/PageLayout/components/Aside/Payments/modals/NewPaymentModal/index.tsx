import Modal from '@renderer/views/components/Modal';
import PaymentForm from '../../PaymentForm';
import { Container } from './styles';

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
      <Container>
        <PaymentForm
          buttonLabel="Criar pagamento"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Container>
    </Modal>
  );
}
