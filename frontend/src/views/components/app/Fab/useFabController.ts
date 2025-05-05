import { HandCoinsIcon, SoupIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useShallow } from 'zustand/shallow';

import { routes } from '@app/Router/routes';
import { useGlobalStore } from '@app/store';
import { Individual } from '@views/assets/icons/customers/options/Individual';

export function useFabController() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

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

  // function handleNewOrderModal() {
  //   setIsDropdownOpen(false);
  //   globalModals.openNewOrderModal();
  // }

  function handleNavigateNewCustomerPage() {
    navigate(routes.newOrder);
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
      handler: handleNavigateNewCustomerPage,
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
