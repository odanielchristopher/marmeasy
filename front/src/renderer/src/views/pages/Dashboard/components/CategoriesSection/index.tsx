import ExpensesSection from './ExpensesSection';
import IncomesSection from './IncomesSection';
import { Container, Separator } from './styles';

export default function CategoriesSection() {
  return (
    <Container>
      <IncomesSection />
      <Separator />
      <ExpensesSection />
    </Container>
  );
}
