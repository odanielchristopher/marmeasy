import { useCallback, useState } from 'react';

import { useExpensesQuery } from '@renderer/app/hooks/queries/useExpensesQuery';

export default function useExpenses() {
  const [isOpenExpensesModal, setIsOpenExpensesModal] = useState(false);

  const handleOpenExpensesModal = useCallback(() => {
    setIsOpenExpensesModal(true);
  }, []);

  const handleCloseExpensesModal = useCallback(() => {
    setIsOpenExpensesModal(false);
  }, []);

  const { expenses, isLoading } = useExpensesQuery();

  return {
    expenses,
    isLoading,
    isOpenExpensesModal,
    handleOpenExpensesModal,
    handleCloseExpensesModal,
  };
}
