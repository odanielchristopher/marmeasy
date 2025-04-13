import { HandCoinsIcon, SoupIcon } from 'lucide-react';
import { useState } from 'react';

import { useFab } from '@app/hooks/useFab';
import { Individual } from '@views/assets/icons/customers/options/Individual';

export function useFabController() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    isOpenNewCustomerModal,
    isOpenNewOrderModal,
    isOpenNewPaymentModal,
    openNewPaymentModal,
    closeNewPaymentModal,
    openNewOrderModal,
    closeNewOrderModal,
    closeNewCustomerModal,
    openNewCustomerModal,
  } = useFab();

  function handleNewCustomerModal() {
    setIsDropdownOpen(false);
    openNewCustomerModal();
  }

  function handleNewOrderModal() {
    setIsDropdownOpen(false);
    openNewOrderModal();
  }

  function handleNewPaymentModal() {
    setIsDropdownOpen(false);
    openNewPaymentModal();
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
    isOpenNewCustomerModal,
    isOpenNewPaymentModal,
    isOpenNewOrderModal,
    closeNewPaymentModal,
    closeNewOrderModal,
    setIsDropdownOpen,
    closeNewCustomerModal,
  };
}
