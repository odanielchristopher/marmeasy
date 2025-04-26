import { customersService } from '@app/services/customersService';
import { Modal } from '@views/components/ui/Modal';
import { CustomerForm } from '@views/forms/CustomerForm';

import { useNewCustomerModalController } from './useNewCustomerModalController';

interface INewCustomerModalProps {
  open: boolean;
  onClose(): void;
}

export function NewCustomerModal({ open, onClose }: INewCustomerModalProps) {
  const { handleSubmit, isLoading } = useNewCustomerModalController({
    customersService,
    onSuccess: onClose,
  });

  return (
    <Modal open={open} title="Novo cliente" onClose={onClose}>
      <CustomerForm onSubmit={handleSubmit} isLoading={isLoading} />
    </Modal>
  );
}
