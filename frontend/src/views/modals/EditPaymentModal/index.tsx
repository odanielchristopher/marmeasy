import { Trash2Icon } from 'lucide-react';

import { IPayment } from '@app/entities/Payment';
import { RemoveModal } from '@views/components/app/RemoveModal';
import { Button } from '@views/components/ui/Button';
import { Modal } from '@views/components/ui/Modal';
import { PaymentForm } from '@views/forms/PaymentForm';

import { useEditPaymentModalController } from './useEditPaymentModalController';

interface IEditPaymentModalProps {
  open: boolean;
  onClose(): void;
  payment: IPayment;
}

export function EditPaymentModal({
  payment,
  open,
  onClose,
}: IEditPaymentModalProps) {
  const {
    isOpenRemovePaymentModal,
    isRemoving,
    isLoading,
    handleSubmit,
    handleOpenRemovePaymentModal,
    handleCloseRemovePaymentModal,
    handleConfirmRemovePayment,
  } = useEditPaymentModalController({
    payment,
    onClose,
  });

  if (isOpenRemovePaymentModal) {
    return (
      <RemoveModal
        open
        warn="Tem certeza que deseja excluir este pagamento?"
        onClose={handleCloseRemovePaymentModal}
        onConfirm={handleConfirmRemovePayment}
        isLoading={isRemoving}
      />
    );
  }

  return (
    <Modal
      open={open}
      title="Editar pagamento"
      onClose={onClose}
      rightAction={
        <Button
          className="w-full"
          type="button"
          variant="ghost"
          onClick={handleOpenRemovePaymentModal}
        >
          <Trash2Icon className="size-5 text-red-900" />
        </Button>
      }
    >
      <PaymentForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        defaultValues={{
          ...payment,
          date: new Date(payment.date),
        }}
        isLoading={isLoading}
      />
    </Modal>
  );
}
