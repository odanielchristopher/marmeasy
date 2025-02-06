import { Income } from '@renderer/app/entities/Income';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import { Item } from '../../../components/Item';
import { SectionTitle } from '../styles';
import { Container } from './styles';

interface IncomesSectionProps {
  incomes: Income[];
}

const translateIncomeType = {
  CREDIT_CARD: 'Crédito',
  DEBIT_CARD: 'Débito',
  CASH: 'Dinheiro',
};

export default function IncomesSection({ incomes }: IncomesSectionProps) {
  return (
    <Container>
      <SectionTitle>Categorias de entradas</SectionTitle>

      <div>
        {incomes.map((income) => {
          const text = translateIncomeType[income.type];

          return (
            <Item.Root $hasAction key={income.id}>
              <Item.Box $align="center">
                <Item.Icon height={28}>
                  <DashboardCategoryIcon
                    type="income"
                    icon={income.type === 'CASH' ? 'cash' : 'default'}
                    size={28}
                  />
                </Item.Icon>
                <Item.Box $direction="column" $gap={-7}>
                  <Item.Title text={text} />
                  <Item.Currency
                    text={`R$ ${formatCurrency(income.value)}`}
                    color="success"
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
