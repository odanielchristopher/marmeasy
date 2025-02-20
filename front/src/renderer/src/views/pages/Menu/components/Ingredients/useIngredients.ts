import { Ingredient } from '@renderer/app/entities/Ingredient';
import { useIngredientsQuery } from '@renderer/app/hooks/queries/useIngredientsQuery';
import { useCallback, useMemo, useState } from 'react';

export default function useIngredients() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openNewIngredientModal, setOpenNewIngredientModal] = useState(false);

  const [ingredientBeignDeleted, setIngredientBeignDeleted] =
    useState<Ingredient | null>(null);
  const [ingredientBeingEdited, setIngredientBeingEdited] =
    useState<Ingredient | null>(null);

  const handleOpenEditModal = useCallback((category: Ingredient) => {
    setIngredientBeingEdited(category);
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIngredientBeingEdited(null);
    setOpenEditModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback((category: Ingredient) => {
    setIngredientBeignDeleted(category);
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIngredientBeignDeleted(null);
    setOpenDeleteModal(false);
  }, []);

  const handleOpenNewIngredientModal = useCallback(() => {
    setOpenNewIngredientModal(true);
  }, []);

  const handleCloseNewIngredientModal = useCallback(() => {
    setOpenNewIngredientModal(false);
  }, []);

  const { ingredients, isLoading } = useIngredientsQuery();

  const hasIngredients = ingredients.length > 0;

  const sortedIngredients = useMemo(
    () =>
      ingredients.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
      ),
    [ingredients],
  );

  return {
    sortedIngredients,
    hasIngredients,
    isLoading,
    ingredientBeignDeleted,
    ingredientBeingEdited,
    openDeleteModal,
    openEditModal,
    openNewIngredientModal,
    handleCloseDeleteModal,
    handleCloseEditModal,
    handleCloseNewIngredientModal,
    handleOpenDeleteModal,
    handleOpenEditModal,
    handleOpenNewIngredientModal,
  };
}
