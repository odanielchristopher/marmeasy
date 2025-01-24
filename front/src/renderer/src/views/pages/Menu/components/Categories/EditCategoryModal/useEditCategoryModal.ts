import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { productCategoriesService } from '@renderer/app/services/productCategoriesService';
import { UpdateProductCategoryParams } from '@renderer/app/services/productCategoriesService/update';

import { queryClient } from '@renderer/App';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { isEmoji } from '@renderer/app/utils/isEmoji';
import toast from '@renderer/app/utils/toast';

const categoryFormSchema = z.object({
  icon: z
    .string({ required_error: 'O emoji é obrigatório.' })
    .refine((value) => isEmoji(value), {
      message: 'Precisa ser um emoji.',
    }),
  name: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

export type FormData = z.infer<typeof categoryFormSchema>;

export default function useEditCategoryModal(
  category: ProductCategory | null,
  onConfirm: () => void,
) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      icon: category?.icon ?? '',
      name: capitalizeFirstLetter(category?.name || ''),
    },
  });

  const { mutateAsync: updateCategory, isPending: isLoading } = useMutation({
    mutationFn: async (data: UpdateProductCategoryParams) =>
      productCategoriesService.update(data),
    onSuccess: (updatedCategory: ProductCategory) => {
      queryClient.setQueryData(
        ['product-categories', 'getAll'],
        (categories: ProductCategory[]) => {
          return categories.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category,
          );
        },
      );
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
        text: 'Categoria editada com sucesso.',
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
          text: 'Ocorreu um erro ao editar a categoria.',
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
