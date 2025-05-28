import { useState } from 'react';

import { IProductCategory } from '@app/entities/ProductCategories';
import { useProductCategories } from '@app/hooks/productCategories/useProductCategories';

export function useProductCategoriesController() {
  const [isOpenNewCategoryModal, setIsOpenNewCategoryModal] = useState(false);
  const [isOpenEditCategoryModal, setIsOpenEditCategoryModal] = useState(false);
  const [isOpenRemoveCategoryModal, setIsOpenRemoveCategoryModal] =
    useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<IProductCategory | null>(null);

  function handleOpenNewCategoryModal() {
    setIsOpenNewCategoryModal(true);
  }

  function handleCloseNewCategoryModal() {
    setIsOpenNewCategoryModal(false);
  }

  function handleOpenEditCategoryModal(category: IProductCategory) {
    setSelectedCategory(category);
    setIsOpenEditCategoryModal(true);
  }

  function handleCloseEditCategoryModal() {
    setIsOpenEditCategoryModal(false);
    setSelectedCategory(null);
  }

  function handleOpenRemoveCategoryModal(category: IProductCategory) {
    setSelectedCategory(category);
    setIsOpenRemoveCategoryModal(true);
  }

  function handleCloseRemoveCategoryModal() {
    setIsOpenRemoveCategoryModal(false);
    setSelectedCategory(null);
  }

  const { categories, isLoading } = useProductCategories();

  const hasCategories = categories.length > 0;

  return {
    categories,
    isLoading,
    hasCategories,
    selectedCategory,
    isOpenNewCategoryModal,
    isOpenEditCategoryModal,
    isOpenRemoveCategoryModal,
    handleOpenNewCategoryModal,
    handleCloseNewCategoryModal,
    handleOpenEditCategoryModal,
    handleCloseEditCategoryModal,
    handleOpenRemoveCategoryModal,
    handleCloseRemoveCategoryModal,
  };
}
