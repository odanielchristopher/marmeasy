import { useState } from 'react';
import toast from 'react-hot-toast';

import { IPayment } from '@app/entities/Payment';
import { useRemovePayment } from '@app/hooks/payments/useRemovePayment';
import { useUpdatePayment } from '@app/hooks/payments/useUpdatePayment';
import { PaymentFormData } from '@views/forms/PaymentForm/schema';

interface IUseEditPaymentModalController {
  payment: IPayment;
  onClose(): void;
}

export function useEditPaymentModalController({
  payment,
  onClose,
}: IUseEditPaymentModalController) {
  const [isOpenRemovePaymentModal, setIsOpenRemovePaymentModal] =
    useState(false);

  function handleOpenRemovePaymentModal() {
    setIsOpenRemovePaymentModal(true);
  }

  function handleCloseRemovePaymentModal() {
    setIsOpenRemovePaymentModal(false);
  }

  const { removePayment, isLoading: isRemoving } = useRemovePayment();

  async function handleConfirmRemovePayment() {
    try {
      await removePayment(payment.id);

      toast.success('Pagamento excluído com sucesso!');
      handleCloseRemovePaymentModal();
      onClose();
    } catch {
      toast.error('Ocorreu um erro ao excluir o pagamento!');
    }
  }

  const { updatePayment, isLoading } = useUpdatePayment();

  async function handleSubmit(formData: PaymentFormData) {
    try {
      await updatePayment({
        ...formData,
        id: payment.id,
        date: formData.date.toISOString(),
        value: Number(formData.value),
      });

      onClose();
      toast.success('Alterações salvas com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao salvar as alterações.');
    }
  }

  return {
    isLoading,
    isRemoving,
    isOpenRemovePaymentModal,
    handleSubmit,
    handleConfirmRemovePayment,
    handleOpenRemovePaymentModal,
    handleCloseRemovePaymentModal,
  };
}
