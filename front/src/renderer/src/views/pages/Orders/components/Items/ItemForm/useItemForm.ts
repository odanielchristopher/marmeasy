import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Product } from '@renderer/app/entities/Product';

export const OrderDetailSchema = z.object({
  selectedIngredients: z.array(z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
  })),
  quantity: z.number().min(1, 'A quantidade deve ser maior que 0'),
  productName: z.string(),
  productImage: z.string(),
  productPrice: z.number(),
  totalPrice: z.number(),
});

export type OrderDetail = z.infer<typeof OrderDetailSchema>;

export default function useItemForm(initialOrder: OrderDetail | undefined, product: Product, onSubmit: (details: OrderDetail) => void, onClose: () => void) {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(initialOrder?.selectedIngredients || []);
  const [quantity, setQuantity] = useState(initialOrder?.quantity || 1);

  const { handleSubmit, formState: { errors }, setValue, trigger } = useForm<OrderDetail>({
    resolver: zodResolver(OrderDetailSchema),
    defaultValues: {
      selectedIngredients: initialOrder?.selectedIngredients || [],
      quantity: initialOrder?.quantity || 1,
      productName: initialOrder?.productName || '',
      productImage: initialOrder?.productImage || '',
      productPrice: initialOrder?.productPrice || 0,
      totalPrice: initialOrder?.totalPrice || 0,
    },
  });


  const handleCheckboxChange = (ingredient: Ingredient) => {
    const isSelected = selectedIngredients.some((ing) => ing.id === ingredient.id);
    const newSelectedIngredients = isSelected
      ? selectedIngredients.filter((ing) => ing.id !== ingredient.id)
      : [...selectedIngredients, ingredient];

    setSelectedIngredients(newSelectedIngredients);
    setValue('selectedIngredients', newSelectedIngredients);
    trigger('selectedIngredients');
  };

  const handleQuantityChange = (newQuantity: number) => {
    setValue('quantity', newQuantity);
    setQuantity(newQuantity);
    trigger('quantity');
  };

  const onSubmitForm = (data: OrderDetail) => {
    const productDetails: OrderDetail = {
      selectedIngredients: data.selectedIngredients,
      quantity: data.quantity,
      productName: product.name,
      productImage: product.imagePath,
      productPrice: product.price,
      totalPrice: product.price * data.quantity,
    };
    onSubmit(productDetails);
    onClose();
  };

  return {
    selectedIngredients,
    quantity,
    handleCheckboxChange,
    handleQuantityChange,
    handleSubmit,
    onSubmitForm,
    errors,
  };
}

