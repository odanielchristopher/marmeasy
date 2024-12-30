import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { productCategoriesService } from '@renderer/app/services/productCategoriesService';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useCategories() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openNewCategoryModal, setOpenNewCategoryModal] = useState(false);

  const [categoryBeignDeleted, setCategoryBeignDeleted] = useState<ProductCategory | null>(null);
  const [categoryBeingEdited, setCategoryBeingEdited] = useState<ProductCategory | null>(null);

  const [categories, setCategories] = useState<ProductCategory[]>([]);

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

  const { data, isLoading } =useQuery({
    queryKey: ['product-categories', 'getAll'],
    queryFn: async () => productCategoriesService.getAll(),
    staleTime: 60000,
  });

  useEffect(() => {
    function loadCategories() {
      setCategories(data ?? []);
    }

    loadCategories();
  }, [data]);

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
