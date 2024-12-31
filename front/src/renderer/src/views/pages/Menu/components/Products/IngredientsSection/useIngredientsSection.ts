import { useIngredients } from '@renderer/app/hooks/queries/useIngredients';
import { useMemo, useState } from 'react';

export default function useIngredientsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const { ingredients, isLoading } = useIngredients();

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const filteredIngredients = useMemo(
    () => (
      ingredients
        .filter((ingredient) => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1))
    ),
    [ingredients, searchTerm],
  );

  return {
    filteredIngredients,
    isLoading,
    handleChangeSearchTerm,
  };
}
