import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { ExpenseIcon } from '@renderer/assets/Icons/ExpenseIcon';
import Loader from '@renderer/views/components/Loader';
import { Card } from '../../components/Card';
import ExpensesModal from './modals/ExpensesModal';
import useExpenses from './useExpenses';

export default function Expenses() {
  const {
    expenses,
    isLoading,
    isOpenExpensesModal,
    handleOpenExpensesModal,
    handleCloseExpensesModal,
  } = useExpenses();

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
