import { useDashboardCategoriesQuery } from '@renderer/app/hooks/queries/useDashboardCategoriesQuery';
import Loader from '@renderer/views/components/Loader';
import ExpensesSection from './ExpensesSection';
import IncomesSection from './IncomesSection';
import { Container, Separator } from './styles';

export type SelectedCategory = {
  icon: string;
  title: string;
  type: 'expense' | 'income';
};

export default function CategoriesSection() {
  const {
    categories: { expenses, incomes },
    isLoading,
  } = useDashboardCategoriesQuery();

  return (
    <Container>
      {!isLoading && (
        <>
          <IncomesSection
            incomes={incomes}
          />
          <Separator />
          <ExpensesSection
            expenses={expenses}
          />
        </>
      )}

      {isLoading && <Loader size={24} $isLoading />}
    </Container>
  );
}
