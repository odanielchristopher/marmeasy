import { useState } from 'react';
import { Ingredient } from '@renderer/app/entities/Ingredient';

interface UseIngredientsModalProps {
  onSelected: (ingredient: Ingredient) => void;
}

export default function useIngredientsModal({ onSelected }: UseIngredientsModalProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<{ [key: string]: boolean }>({});
  const [quantity, setQuantity] = useState(1);

  const handleCheckboxChange = (ingredientId: string) => {
    setSelectedIngredients((prev) => {
      const newSelectedIngredients = { ...prev, [ingredientId]: !prev[ingredientId] };
      if (newSelectedIngredients[ingredientId]) {
        onSelected({ id: ingredientId } as Ingredient); // Assuming you have the ingredient object here
      }
      return newSelectedIngredients;
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return {
    selectedIngredients,
    quantity,
    handleCheckboxChange,
    handleQuantityChange,
  };
}
