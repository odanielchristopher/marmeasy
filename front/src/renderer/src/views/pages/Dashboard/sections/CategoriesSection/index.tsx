import { categories } from '@renderer/app/mocks/categories';
import ExpensesSection from './ExpensesSection';
import IncomesSection from './IncomesSection';
import { Container, Separator } from './styles';

export default function CategoriesSection() {
  const expenses = categories.expenses;
  const incomes = categories.incomes;

  return (
    <Container>
      <IncomesSection incomes={incomes} />
      <Separator />
      <ExpensesSection expenses={expenses} />
    </Container>
  );
}
