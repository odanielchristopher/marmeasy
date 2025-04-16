import { Modal } from '@views/components/ui/Modal';

import { OrderForm } from '../../Orderform';

interface INewOrderModalProps {
  open: boolean;
  onClose(): void;
}

export function NewOrderModal({ open, onClose }: INewOrderModalProps) {
  return (
    <Modal open={open} title="Novo pedido" onClose={onClose}>
      <OrderForm />
    </Modal>
  );
}
