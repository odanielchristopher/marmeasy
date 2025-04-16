import { Modal } from '@views/components/ui/Modal';

import { CustomerForm } from '../../forms/CustomerForm';

interface INewCustomerModalProps {
  open: boolean;
  onClose(): void;
}

export function NewCustomerModal({ open, onClose }: INewCustomerModalProps) {
  return (
    <Modal open={open} title="Novo cliente" onClose={onClose}>
      <CustomerForm onSubmit={(formData) => console.log(formData)} />
    </Modal>
  );
}
