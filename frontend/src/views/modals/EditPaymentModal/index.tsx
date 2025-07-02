import { IPayment } from '@app/entities/Payment';
import { Modal } from '@views/components/ui/Modal';
import { PaymentForm } from '@views/forms/PaymentForm';

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
  return (
    <Modal open={open} title="Editar pagamento" onClose={onClose}>
      <PaymentForm
        buttonLabel="Salvar alterações"
        onSubmit={(formData) => console.log(formData)}
        defaultValues={{
          ...payment,
          date: new Date(payment.date),
        }}
      />
    </Modal>
  );
}
