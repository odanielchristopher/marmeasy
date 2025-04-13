import { HandCoinsIcon, SoupIcon } from 'lucide-react';
import { useState } from 'react';

import { useFab } from '@app/hooks/useFab';
import { Individual } from '@views/assets/icons/customers/options/Individual';

export function useFabController() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    isOpenNewCustomerModal,
    closeNewCustomerModal,
    openNewCustomerModal,
  } = useFab();

  function handleNewCustomer() {
    setIsDropdownOpen(false);
    openNewCustomerModal();
  }

  const fabItems = [
    {
      label: 'Novo cliente',
      icon: Individual,
      colorIcon: 'text-gray-800',
      bgIcon: 'bg-gray-200',
      handler: handleNewCustomer,
    },
    {
      label: 'Novo pedido',
      icon: SoupIcon,
      colorIcon: 'text-primary-500',
      bgIcon: 'bg-primary-100',
      handler: () => {
        console.log('Open NewOrder Modal');
      },
    },
    {
      label: 'Novo pagamento',
      icon: HandCoinsIcon,
      colorIcon: 'text-teal-900',
      bgIcon: 'bg-teal-50',
      handler: () => {
        console.log('Open NewPayment Modal');
      },
    },
  ];

  return {
    fabItems,
    isDropdownOpen,
    isOpenNewCustomerModal,
    setIsDropdownOpen,
    closeNewCustomerModal,
  };
}
