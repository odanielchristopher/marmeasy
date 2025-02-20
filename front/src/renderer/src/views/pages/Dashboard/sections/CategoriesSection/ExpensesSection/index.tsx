import { Expense } from '@renderer/app/entities/Expense';
import { useExpensesByTypeQuery } from '@renderer/app/hooks/queries/useExpensesByTypeQuery';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import { useCallback, useState } from 'react';
import ExpensesModal from '../../../components/ExpensesModal';
import { Item } from '../../../components/Item';
import { SectionTitle } from '../styles';
import { Container } from './styles';

interface ExpenseSectionProps {
  expenses: Expense[];
}

export const translateExpenseType = {
  others: 'Outras saídas',
  taxes: 'Impostos',
  employees: 'Funcionários',
  equipments: 'Equipamentos',
  meats: 'Frios',
  utensils: 'Utensílios',
  delivery: 'Entregas',
  garrisons: 'Guarnição',
};

export default function ExpensesSection({ expenses }: ExpenseSectionProps) {
  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false);
  const [selectedExpenseType, setSelectedExpense] = useState<string>('');

  const handleOpenExpenseModal = useCallback((expense: Expense) => {
    setSelectedExpense(expense.type.toLowerCase());
    setIsOpenExpenseModal(true);
  }, []);

  const handleCloseExpenseModal = useCallback(() => {
    setSelectedExpense('');
    setIsOpenExpenseModal(false);
  }, []);

  const { expenses: selectedTypeExpenses, isLoading } = useExpensesByTypeQuery({
    type: selectedExpenseType,
    enabled: isOpenExpenseModal,
  });

  return (
    <Container>
      {isOpenExpenseModal && (
        <ExpensesModal
          open
          hasAction={false}
          isLoading={isLoading}
          expensesHistory={selectedTypeExpenses.history}
          onClose={handleCloseExpenseModal}
          title={
            translateExpenseType[
              selectedExpenseType as keyof typeof translateExpenseType
            ]
          }
        />
      )}

      <SectionTitle>Categorias de saídas</SectionTitle>
      <div>
        {expenses.map((expense) => {
          const title =
            translateExpenseType[
              expense.type.toLowerCase() as keyof typeof translateExpenseType
            ];
          const icon = expense.type.toLowerCase();

          return (
            <Item.Root
              $hasAction
              key={expense.id}
              onClick={() => handleOpenExpenseModal(expense)}
            >
              <Item.Box $align="center">
                <Item.Icon height={28}>
                  <DashboardCategoryIcon type="expense" icon={icon} size={28} />
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
    </Container>
  );
}
