import { zodResolver } from '@hookform/resolvers/zod';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const OrderDetailSchema = z.object({
  selectedIngredients: z.array(z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
  })).min(1, 'Selecione pelo menos um ingrediente'),
  quantity: z.number().min(1, {}),
  productName: z.string(),
  productImage: z.string(),
  productPrice: z.number(),
  totalPrice: z.number(),
});

export type OrderDetail = z.infer<typeof OrderDetailSchema>;

export default function useItemForm(initialOrder: OrderDetail | undefined) {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(initialOrder?.selectedIngredients || []);
  const [quantity, setQuantity] = useState(initialOrder?.quantity || 1);
  const { register, formState: { errors } } = useForm<OrderDetail>({
    resolver: zodResolver(OrderDetailSchema),
  });


  const handleCheckboxChange = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) => {
      const isSelected = prev.some((ing) => ing.id === ingredient.id);
      const newSelectedIngredients = isSelected
        ? prev.filter((ing) => ing.id !== ingredient.id)
        : [...prev, ingredient];
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
    register,
    errors,
  };
}

