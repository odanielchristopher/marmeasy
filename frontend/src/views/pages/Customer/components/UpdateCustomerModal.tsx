import toast from 'react-hot-toast';

import { ICustomer } from '@app/entities/Customer';
import { useUpdateCustomer } from '@app/hooks/customers/useUpdateCustomer';
import { Modal } from '@views/components/ui/Modal';
import { CustomerForm } from '@views/forms/CustomerForm';
import { CustomerFormData } from '@views/forms/CustomerForm/schema';

interface INewCustomerModalProps {
  open: boolean;
  customer: ICustomer;
  onClose(): void;
}

export function UpdateCustomerModal({
  open,
  customer,
  onClose,
}: INewCustomerModalProps) {
  const { updateCustomer, isLoading } = useUpdateCustomer(customer.id);

  async function handleSubmit(formData: CustomerFormData) {
    try {
      await updateCustomer({
        ...formData,
        id: customer.id,
        phone: formData.phone || undefined,
        initialBalance: Number(formData.initialBalance),
      });
      toast.success('Alterações salvas com sucesso!');
      onClose();
    } catch {
      toast.error('Ocorreu um erro ao salvar as alterações!');
    }
  }

  return (
    <Modal open={open} title="Editar informações" onClose={onClose}>
      <CustomerForm
        onSubmit={handleSubmit}
        defaultValues={{
          ...customer,
          initialBalance: customer.balance.toString(),
        }}
        buttonLabel="Salvar alterações"
        isLoading={isLoading}
      />
    </Modal>
  );
}
