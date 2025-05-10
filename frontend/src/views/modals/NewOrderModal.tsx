import { Modal } from '@views/components/ui/Modal';
import { OrderForm } from '@views/forms/OrderForm';

interface INewOrderModalProps {
  open: boolean;
  onClose(): void;
}

export function NewOrderModal({ open, onClose }: INewOrderModalProps) {
  return (
    <Modal open={open} title="Novo pedido" onClose={onClose}>
      <OrderForm
        onSubmit={(formData) => console.log(formData)}
        submitButtonLabel="Fechar pedido"
      />
    </Modal>
  );
}
