import { useExpensesQuery } from '@renderer/app/hooks/queries/useExpensesQuery';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { ExpenseIcon } from '@renderer/assets/Icons/ExpenseIcon';
import Loader from '@renderer/views/components/Loader';
import { useCallback, useState } from 'react';
import { Card } from '../../components/Card';
import ExpensesModal from './ExpensesModal';

export default function Expenses() {
  const [isOpenExpensesModal, setIsOpenExpensesModal] = useState(false);

  const handleOpenExpensesModal = useCallback(() => {
    setIsOpenExpensesModal(true);
  }, []);

  const handleCloseExpensesModal = useCallback(() => {
    setIsOpenExpensesModal(false);
  }, []);

  const { expenses, isLoading } = useExpensesQuery();

  return (
    <>
      {isOpenExpensesModal && (
        <ExpensesModal
          open
          onClose={handleCloseExpensesModal}
          expensesHistory={expenses.history}
        />
      )}

      <Card.Root onClick={handleOpenExpensesModal} disabled={isLoading}>
        {!isLoading && (
          <>
            <Card.Content>
              <Card.Title text="Saídas" />
              <Card.Info text={`R$ ${formatCurrency(expenses.total)}`} />
            </Card.Content>
            <Card.Icon color="danger" height={42}>
              <ExpenseIcon size={42} />
            </Card.Icon>
          </>
        )}

        {isLoading && <Loader size={24} $isLoading />}
      </Card.Root>
    </>
  );
}
