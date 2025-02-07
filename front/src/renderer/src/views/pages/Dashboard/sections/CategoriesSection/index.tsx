import { useDashboardCategoriesQuery } from '@renderer/app/hooks/queries/useDashboardCategoriesQuery';
import Loader from '@renderer/views/components/Loader';
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

  const {
    categories: { expenses, incomes },
    isLoading,
  } = useDashboardCategoriesQuery();

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

      {!isLoading && (
        <>
          <IncomesSection
            incomes={incomes}
            onSelect={handleOpenCategoryModal}
          />
          <Separator />
          <ExpensesSection
            expenses={expenses}
            onSelect={handleOpenCategoryModal}
          />
        </>
      )}

      {isLoading && <Loader size={24} $isLoading />}
    </Container>
  );
}
