import { Modal } from '@views/components/ui/Modal';

interface INewCustomerModalProps {
  open: boolean;
  onClose(): void;
}

export function NewCustomerModal({ open, onClose }: INewCustomerModalProps) {
  return (
    <Modal open={open} title="Novo cliente" onClose={onClose}>
      <div>Content</div>
    </Modal>
  );
}
