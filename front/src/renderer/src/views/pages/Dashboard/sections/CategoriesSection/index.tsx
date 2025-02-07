import { categories } from '@renderer/app/mocks/categories';
import { useCallback, useState } from 'react';
import CategoryModal from './CategoryModal';
import ExpensesSection from './ExpensesSection';
import IncomesSection from './IncomesSection';
import { Container, Separator } from './styles';

export type SelectedCategory = {
  icon: string;
  title: string;
  type: 'expense' | 'income';
};

export default function CategoriesSection() {
  const expenses = categories.expenses;
  const incomes = categories.incomes;

  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory | null>(null);

  const handleOpenCategoryModal = useCallback((category: SelectedCategory) => {
    setSelectedCategory(category);
    setIsOpenCategoryModal(true);
  }, []);

  const handleCloseCategoryModal = useCallback(() => {
    setSelectedCategory(null);
    setIsOpenCategoryModal(false);
  }, []);

  return (
    <Container>
      {isOpenCategoryModal && (
        <CategoryModal
          open
          onClose={handleCloseCategoryModal}
          icon={selectedCategory!.icon}
          title={selectedCategory!.title}
          type={selectedCategory!.type}
        />
      )}

      <IncomesSection incomes={incomes} onSelect={handleOpenCategoryModal} />
      <Separator />
      <ExpensesSection expenses={expenses} onSelect={handleOpenCategoryModal} />
    </Container>
  );
}
