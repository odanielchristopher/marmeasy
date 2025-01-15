import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import { productCategoriesService } from '@renderer/app/services/productCategoriesService';
import { UpdateProductCategoryParams } from '@renderer/app/services/productCategoriesService/update';

import { queryClient } from '@renderer/App';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { isEmoji } from '@renderer/app/utils/isEmoji';
import toast from '@renderer/app/utils/toast';

const ingredientFormSchema = z.object({
  icon: z
    .string({ required_error: 'O emoji é obrigatório.' })
    .refine((value) => isEmoji(value), {
      message: 'Precisa ser um emoji.',
    }),
  name: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

export type FormData = z.infer<typeof ingredientFormSchema>

export default function useEditIngredientModal(category: Ingredient | null, onConfirm: () => void) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      icon: category?.icon ?? '',
      name: capitalizeFirstLetter(category?.name || ''),
    },
  });

  const {mutateAsync: updateCategory, isPending: isLoading} = useMutation({
    mutationFn: async (data: UpdateProductCategoryParams) => productCategoriesService.update(data),
    onSuccess: (updatedCategory: Ingredient) => {
      queryClient.setQueryData(['product-categories', 'getAll'], (categories: Ingredient[]) => {

        return categories.map((category) => category.id === updatedCategory.id ? updatedCategory : category);
      });
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateCategory({
        id: category!.id,
        ...data,
      });

      toast({
        type: 'success',
        text: 'Ingrediente editado com sucesso.',
      });

      onConfirm();
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message;

        if (message) {
          toast({
            type: 'danger',
            text: message,
          });

          return;
        }

        toast({
          type: 'danger',
          text: 'Ocorreu um erro ao editar o ingrediente.',
        });
      }
    }
  });

  return {
    errors,
    isLoading,
    register,
    handleSubmit,
  };
}
