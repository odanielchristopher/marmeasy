import Modal from '@renderer/views/components/Modal';
import PaymentForm from '../../PaymentForm';

import { Client } from '@renderer/app/entities/Client';
import { Payment } from '@renderer/app/entities/Payment';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import DeletePaymentModal from '../DeletePaymentModal';
import { StyledDeleteButton } from './styles';
import useEditPaymentModal from './useEditPaymentModal';

interface EditPaymentModalProps {
  client: Client | null;
  payment: Payment | null;
  open: boolean;
  onClose(): void;
}

export default function EditPaymentModal({
  open,
  client,
  payment,
  onClose,
}: EditPaymentModalProps) {
  const {
    isLoading,
    isOpenDeletePaymentModal,
    handleSubmit,
    handleOpenDeletePaymentModal,
    handleCloseDeletePaymentModal,
  } = useEditPaymentModal({
    onSuccess: onClose,
    client,
    payment: payment,
  });

  if (isOpenDeletePaymentModal) {
    return (
      <DeletePaymentModal
        payment={payment}
        client={client}
        onClose={handleCloseDeletePaymentModal}
        onConfirm={onClose}
      />
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Editar pagamento"
      action={
        <StyledDeleteButton
          type="button"
          onClick={handleOpenDeletePaymentModal}
        >
          <DeleteIcon />
        </StyledDeleteButton>
      }
    >
      <div>
        <PaymentForm
          buttonLabel="Salvar alterações"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          payment={payment}
        />
      </div>
    </Modal>
  );
}
