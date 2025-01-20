import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { queryClient } from '@renderer/App';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { productCategoriesService } from '@renderer/app/services/productCategoriesService';
import { CreateProductCategoryParams } from '@renderer/app/services/productCategoriesService/create';
import { isEmoji } from '@renderer/app/utils/isEmoji';
import toast from '@renderer/app/utils/toast';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

const categoryFormSchema = z.object({
  icon: z.string({ required_error: 'O emoji é obrigatório.' }).refine((value) => isEmoji(value), {
    message: 'Precisa ser um emoji.',
  }),
  name: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

export type FormData = z.infer<typeof categoryFormSchema>

export default function useNewCategoryModal(onCreate: () => void, isOpen: boolean) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(categoryFormSchema),
  });

  const { mutateAsync: createCategory, isPending: isLoading } = useMutation({
    mutationFn: (data: CreateProductCategoryParams) => productCategoriesService.create(data),
    onSuccess: (newCategory: ProductCategory) => {
      queryClient.setQueryData(
        ['product-categories', 'getAll'],
        (categories: ProductCategory[]) => [...categories, newCategory],
      );
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await createCategory(data);
      toast({
        type: 'success',
        text: 'Categoria criada com sucesso.',
      });
      onCreate();
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
          text: 'Ocorreu um erro ao criar categoria.',
        });
      }
    }
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [isOpen]);

  return {
    isLoading,
    errors,
    register,
    handleSubmit,
  };
}
