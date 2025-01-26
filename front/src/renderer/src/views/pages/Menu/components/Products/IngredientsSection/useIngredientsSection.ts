import { useIngredientsQuery } from '@renderer/app/hooks/queries/useIngredientsQuery';
import { useMemo, useState } from 'react';

export default function useIngredientsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const { ingredients, isLoading } = useIngredientsQuery();

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const filteredIngredients = useMemo(
    () =>
      ingredients
        .filter((ingredient) =>
          ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)),
    [ingredients, searchTerm],
  );

  return {
    filteredIngredients,
    isLoading,
    handleChangeSearchTerm,
  };
}
