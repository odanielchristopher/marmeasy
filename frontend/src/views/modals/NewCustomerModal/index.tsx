import { useCreateCustomer } from '@app/hooks/customers/useCreateCustomer';
import { Modal } from '@views/components/ui/Modal';
import { CustomerForm } from '@views/forms/CustomerForm';

import { useNewCustomerModalController } from './useNewCustomerModalController';

interface INewCustomerModalProps {
  open: boolean;
  onClose(): void;
}

export function NewCustomerModal({ open, onClose }: INewCustomerModalProps) {
  const { handleSubmit, isLoading } = useNewCustomerModalController({
    onSuccess: onClose,
    createCustomerHook: useCreateCustomer,
  });

  return (
    <Modal open={open} title="Novo cliente" onClose={onClose}>
      <CustomerForm
        onSubmit={handleSubmit}
        buttonLabel="Criar cliente"
        isLoading={isLoading}
      />
    </Modal>
  );
}
