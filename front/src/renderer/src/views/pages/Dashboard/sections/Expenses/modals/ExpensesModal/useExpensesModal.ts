import { useCallback, useState } from 'react';

import { Expense } from '@renderer/app/entities/Expense';
import { History } from '@renderer/app/services/types';

interface UseExpensesModalProps {
  expensesHistory: History<Expense>;
}

export default function useExpensesModal({
  expensesHistory,
}: UseExpensesModalProps) {
  const [isOpenNewExpenseModal, setIsOpenNewExpenseModal] = useState(false);
  const [isOpenEditExpenseModal, setIsOpenEditExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const handleOpenNewExpenseModal = useCallback(() => {
    setIsOpenNewExpenseModal(true);
  }, []);

  const handleCloseNewExpenseModal = useCallback(() => {
    setIsOpenNewExpenseModal(false);
  }, []);


  const handleOpenEditExpenseModal = useCallback((expense: Expense) => {
    setSelectedExpense(expense);
    setIsOpenEditExpenseModal(true);
  }, []);

  const handleCloseEditExpenseModal = useCallback(() => {
    setIsOpenEditExpenseModal(false);
  }, []);

  const hasExpenses = Object.entries(expensesHistory).length > 0;

  return {
    hasExpenses,
    selectedExpense,
    isOpenNewExpenseModal,
    isOpenEditExpenseModal,
    handleOpenNewExpenseModal,
    handleOpenEditExpenseModal,
    handleCloseNewExpenseModal,
    handleCloseEditExpenseModal,
  };
}
