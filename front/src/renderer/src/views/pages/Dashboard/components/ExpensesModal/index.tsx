import { Expense } from '@renderer/app/entities/Expense';
import { History } from '@renderer/app/services/types';

import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { formatDay } from '@renderer/app/utils/formatDay';
import { formatMonthYear } from '@renderer/app/utils/formatMonthYear';
import { translateExpenseType } from '../../sections/CategoriesSection/ExpensesSection';

import NewExpenseModal from '../../sections/Expenses/modals/NewExpenseModal';
import useExpensesModal from './useExpensesModal';

import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import emptyImage from '@renderer/assets/Images/empty-box.svg';

import { Item } from '@renderer/views/pages/Dashboard/components/Item';
import { Modal } from '@renderer/views/pages/Dashboard/components/Modal';

import Loader from '@renderer/views/components/Loader';
import EditExpenseModal from '../../sections/Expenses/modals/EditExpenseModal';
import { EmptyImageContainer } from '../EmptyImageContainer';
import { LoaderContainer } from '../LoaderContainer';
import { AddButton, ListPerDate } from './styles';

interface ExpensesModalProps {
  open: boolean;
  title?: string;
  isLoading?: boolean;
  hasAction?: boolean;
  expensesHistory: History<Expense>;
  onClose(): void;
}

export default function ExpensesModal({
  open,
  title,
  isLoading,
  hasAction = true,
  expensesHistory,
  onClose,
}: ExpensesModalProps) {
  const {
    hasExpenses,
    isOpenNewExpenseModal,
    handleOpenNewExpenseModal,
    handleCloseNewExpenseModal,
    handleOpenEditExpenseModal,
    handleCloseEditExpenseModal,
    isOpenEditExpenseModal,
    selectedExpense,
  } = useExpensesModal({ expensesHistory });

  if (isOpenNewExpenseModal) {
    return (
      <NewExpenseModal
        open
        onClose={handleCloseNewExpenseModal}
        onSuccess={() => {
          handleCloseNewExpenseModal();
          onClose();
        }}
      />
    );
  }

  if (isOpenEditExpenseModal) {
    return (
      <EditExpenseModal
        open
        onClose={handleCloseEditExpenseModal}
        onSuccess={() => {
          handleCloseEditExpenseModal();
          onClose();
        }}
        expense={selectedExpense}
      />
    );
  }

  return (
    <Modal.Root
      open={open}
      onClose={onClose}
      title={title ?? 'Saídas'}
      action={
        hasAction && (
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
        )
      }
    >
      {isLoading && (
        <LoaderContainer>
          <Loader $isLoading size={24} />
        </LoaderContainer>
      )}

      {!hasExpenses && !isLoading && (
        <EmptyImageContainer>
          <img src={emptyImage} alt="Sem gastos nesse período" />
          <p>Não encontramos nenhum gasto nesse período</p>
        </EmptyImageContainer>
      )}

      {!isLoading &&
        hasExpenses &&
        Object.entries(expensesHistory).map(([monthYear, days]) => (
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
                    <Item.Root
                      $hasAction
                      key={expense.id}
                      onClick={() => handleOpenEditExpenseModal(expense)}
                    >
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
