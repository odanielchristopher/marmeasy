import { Modal } from '@views/components/ui/Modal';

interface INewOrderModalProps {
  open: boolean;
  onClose(): void;
}

export function NewOrderModal({ open, onClose }: INewOrderModalProps) {
  return (
    <Modal open={open} title="Novo pedido" onClose={onClose}>
      <div>Content</div>
    </Modal>
  );
}
