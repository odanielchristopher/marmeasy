import Modal from '@renderer/views/components/Modal';
import PaymentForm from '../../PaymentForm';
import {
  Container,
} from './styles';

import useNewPaymentModal from './useNewPaymentModal';

interface NewPaymentModalProps {
  open: boolean;
  onClose(): void;
}


export default function NewPaymentModal({
  open,
  onClose,
}: NewPaymentModalProps) {
  const {
    handleSubmit,
  } = useNewPaymentModal(onClose);

  return (
    <Modal open={open} onClose={onClose} title="Novo pagamento">
      <Container>
        <PaymentForm
          buttonLabel='Criar pagamento'
          onSubmit={handleSubmit}
        />
      </Container>
    </Modal>
  );
}
