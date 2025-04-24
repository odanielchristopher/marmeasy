import { Modal } from '@views/components/ui/Modal';

interface INewPaymentModalProps {
  open: boolean;
  onClose(): void;
}

export function NewPaymentModal({ open, onClose }: INewPaymentModalProps) {
  return (
    <Modal open={open} title="Novo pagamento" onClose={onClose}>
      <div>Content</div>
    </Modal>
  );
}
