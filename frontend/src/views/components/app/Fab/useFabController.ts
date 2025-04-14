import { HandCoinsIcon, SoupIcon } from 'lucide-react';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { useGlobalStore } from '@app/store';
import { Individual } from '@views/assets/icons/customers/options/Individual';

export function useFabController() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const globalModals = useGlobalStore(
    useShallow((store) => ({
      openNewCustomerModal: store.globalModals.openNewCustomerModal,
      openNewOrderModal: store.globalModals.openNewOrderModal,
      openNewPaymentModal: store.globalModals.openNewPaymentModal,
    })),
  );

  function handleNewCustomerModal() {
    setIsDropdownOpen(false);
    globalModals.openNewCustomerModal();
  }

  function handleNewOrderModal() {
    setIsDropdownOpen(false);
    globalModals.openNewOrderModal();
  }

  function handleNewPaymentModal() {
    setIsDropdownOpen(false);
    globalModals.openNewPaymentModal();
  }

  const fabItems = [
    {
      label: 'Novo cliente',
      icon: Individual,
      colorIcon: 'text-gray-800',
      bgIcon: 'bg-gray-200',
      handler: handleNewCustomerModal,
    },
    {
      label: 'Novo pedido',
      icon: SoupIcon,
      colorIcon: 'text-primary-500',
      bgIcon: 'bg-primary-100',
      handler: handleNewOrderModal,
    },
    {
      label: 'Novo pagamento',
      icon: HandCoinsIcon,
      colorIcon: 'text-teal-900',
      bgIcon: 'bg-teal-50',
      handler: handleNewPaymentModal,
    },
  ];

  return {
    fabItems,
    isDropdownOpen,
    setIsDropdownOpen,
  };
}
