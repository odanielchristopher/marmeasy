import { useCallback, useState } from 'react';

import { Expense } from '@renderer/app/entities/Expense';
import { History } from '@renderer/app/services/types';

import { Item } from '../../../components/Item';
import { Modal } from '../../../components/Modal';
import { translateExpenseType } from '../../CategoriesSection/ExpensesSection';

import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { formatDay } from '@renderer/app/utils/formatDay';
import { formatMonthYear } from '@renderer/app/utils/formatMonthYear';

import NewExpenseModal from '../NewExpenseModal';

import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import { AddButton, ListPerDate } from './styles';
interface ExpensesModalProps {
  open: boolean;
  onClose(): void;
  expensesHistory: History<Expense>;
}

export default function ExpensesModal({
  onClose,
  open,
  expensesHistory,
}: ExpensesModalProps) {
  const [isOpenNewExpenseModal, setIsOpenNewExpenseModal] = useState(false);

  const handleOpenNewExpenseModal = useCallback(() => {
    setIsOpenNewExpenseModal(true);
  }, []);

  const handleCloseNewExpenseModal = useCallback(() => {
    setIsOpenNewExpenseModal(false);
  }, []);

  if (isOpenNewExpenseModal) {
    return <NewExpenseModal open onClose={handleCloseNewExpenseModal} />;
  }

  return (
    <Modal.Root
      open={open}
      onClose={onClose}
      title="Saídas"
      action={
        <AddButton onClick={handleOpenNewExpenseModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M1 8L15 8M8 1L8 15"
              stroke="CurrentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </AddButton>
      }
    >
      {Object.entries(expensesHistory).map(([monthYear, days]) => (
        <ListPerDate key={monthYear}>
          <Modal.Label
            text={capitalizeFirstLetter(formatMonthYear(monthYear))}
          />

          {Object.entries(days).map(([day, expenses], index) => (
            <div key={index}>
              <Modal.Description
                text={capitalizeFirstLetter(formatDay(day, monthYear))}
              />

              {expenses.map((expense) => {
                const type = expense.type.toLowerCase();
                const title =
                  translateExpenseType[
                    type as keyof typeof translateExpenseType
                  ];

                return (
                  <Item.Root $hasAction key={expense.id}>
                    <Item.Box $align="center">
                      <Item.Icon height={32}>
                        <DashboardCategoryIcon
                          type="expense"
                          icon={type}
                          size={32}
                        />
                      </Item.Icon>

                      <Item.Box $direction="column" $gap={-7}>
                        <Item.Title text={title} />
                        <Item.Currency
                          text={`R$ ${formatCurrency(expense.value)}`}
                          color="danger"
                        />
                      </Item.Box>
                    </Item.Box>
                  </Item.Root>
                );
              })}
            </div>
          ))}
        </ListPerDate>
      ))}
    </Modal.Root>
  );
}
