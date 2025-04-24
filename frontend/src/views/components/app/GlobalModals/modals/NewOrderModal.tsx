import { OrderForm } from '@views/components/app/forms/OrderForm';
import { Modal } from '@views/components/ui/Modal';

interface INewOrderModalProps {
  open: boolean;
  onClose(): void;
}

export function NewOrderModal({ open, onClose }: INewOrderModalProps) {
  return (
    <Modal open={open} title="Novo pedido" onClose={onClose}>
      <OrderForm onSubmit={(formData) => console.log(formData)} />
    </Modal>
  );
}
