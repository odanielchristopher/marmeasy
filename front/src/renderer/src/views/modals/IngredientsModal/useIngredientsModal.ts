import { useState } from 'react';
import { Ingredient } from '@renderer/app/entities/Ingredient';

interface UseIngredientsModalProps {
  onSelected: (ingredient: Ingredient) => void;
  onSubmit: (data: { selectedIngredients: Ingredient[], quantity: number, productName: string, productImage: string, productPrice: number, totalPrice: number }) => void;
  productName: string;
  productImage: string;
  productPrice: number;
}

export default function useIngredientsModal({ onSelected, onSubmit, productName, productImage, productPrice }: UseIngredientsModalProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleCheckboxChange = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) => {
      const isSelected = prev.some((ing) => ing.id === ingredient.id);
      const newSelectedIngredients = isSelected
        ? prev.filter((ing) => ing.id !== ingredient.id)
        : [...prev, ingredient];
      if (!isSelected) {
        onSelected(ingredient);
      }
      return newSelectedIngredients;
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleSubmit = () => {
    const totalPrice = productPrice * quantity;
    onSubmit({
      selectedIngredients,
      quantity,
      productName,
      productImage,
      productPrice,
      totalPrice,
    });
  };

  return {
    selectedIngredients,
    quantity,
    handleCheckboxChange,
    handleQuantityChange,
    handleSubmit,
  };
}

