import { Expense } from '@renderer/app/entities/Expense';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import { SelectedCategory } from '..';
import { Item } from '../../../components/Item';
import { SectionTitle } from '../styles';
import { Container } from './styles';

interface ExpenseSectionProps {
  expenses: Expense[];
  onSelect?(category: SelectedCategory): void;
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

export default function ExpensesSection({
  expenses,
  onSelect,
}: ExpenseSectionProps) {
  return (
    <Container>
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
              onClick={() =>
                onSelect?.({
                  icon,
                  title,
                  type: 'expense',
                })
              }
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
