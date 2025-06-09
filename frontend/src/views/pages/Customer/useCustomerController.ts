import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { useCustomer } from '@app/hooks/customers/useCustomer';
import { useRemoveCustomer } from '@app/hooks/customers/useRemoveCustomer';
import { routes } from '@app/Router/routes';

interface IUseCustomerController {
  customerId: string;
}

export function useCustomerController({ customerId }: IUseCustomerController) {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
  const { customer, isLoading } = useCustomer(customerId);
  const { removeCustomer, isLoading: isRemoving } = useRemoveCustomer();
  const navigate = useNavigate();

  function handleOpenUpdateModal() {
    setIsOpenUpdateModal(true);
  }
  function handleCloseUpdateModal() {
    setIsOpenUpdateModal(false);
  }
  function handleOpenRemoveModal() {
    setIsOpenRemoveModal(true);
  }
  function handleCloseRemoveModal() {
    setIsOpenRemoveModal(false);
  }

  async function handleConfirmRemove() {
    try {
      await removeCustomer(customerId);

      toast.success('Cliente excluido com sucesso!');
      handleCloseRemoveModal();
      navigate(routes.customers);
    } catch {
      toast.error('Ocorreu um erro ao excluir cliente!');
    }
  }

  return {
    customer,
    isLoading,
    isRemoving,
    isOpenUpdateModal,
    isOpenRemoveModal,
    handleConfirmRemove,
    handleOpenUpdateModal,
    handleCloseUpdateModal,
    handleOpenRemoveModal,
    handleCloseRemoveModal,
  };
}
