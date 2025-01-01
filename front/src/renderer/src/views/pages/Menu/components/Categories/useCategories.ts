import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { useCallback, useMemo, useState } from 'react';

export default function useCategories() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openNewCategoryModal, setOpenNewCategoryModal] = useState(false);

  const [categoryBeignDeleted, setCategoryBeignDeleted] = useState<ProductCategory | null>(null);
  const [categoryBeingEdited, setCategoryBeingEdited] = useState<ProductCategory | null>(null);

  const handleOpenEditModal = useCallback((category: ProductCategory) => {
    setCategoryBeingEdited(category);
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setCategoryBeingEdited(null);
    setOpenEditModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback((category: ProductCategory) => {
    setCategoryBeignDeleted(category);
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setCategoryBeignDeleted(null);
    setOpenDeleteModal(false);
  }, []);

  const handleOpenNewCategoryModal = useCallback(() => {
    setOpenNewCategoryModal(true);
  }, []);

  const handleCloseNewCategoryModal = useCallback(() => {
    setOpenNewCategoryModal(false);
  }, []);

  const { categories, isLoading } = useProductCategoriesQuery();

  const hasCategories = categories.length > 0;

  const sortedCategories = useMemo(
    () => (
      categories
        .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1))
    ),
    [categories],
  );

  return {
    categories: sortedCategories,
    hasCategories,
    isLoading,
    categoryBeignDeleted,
    categoryBeingEdited,
    openDeleteModal,
    openEditModal,
    openNewCategoryModal,
    handleCloseDeleteModal,
    handleCloseEditModal,
    handleCloseNewCategoryModal,
    handleOpenDeleteModal,
    handleOpenEditModal,
    handleOpenNewCategoryModal,
  };
}
