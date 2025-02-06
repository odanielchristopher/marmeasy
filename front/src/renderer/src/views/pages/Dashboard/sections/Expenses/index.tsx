import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { ExpenseIcon } from '@renderer/assets/Icons/ExpenseIcon';
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

  return (
    <>
      {isOpenExpensesModal && (
        <ExpensesModal open onClose={handleCloseExpensesModal} />
      )}

      <Card.Root onClick={handleOpenExpensesModal}>
        <Card.Content>
          <Card.Title text="Saídas" />
          <Card.Info text={`R$ ${formatCurrency(2321)}`} />
        </Card.Content>
        <Card.Icon color="danger" height={42}>
          <ExpenseIcon size={42} />
        </Card.Icon>
      </Card.Root>
    </>
  );
}
