import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { queryClient } from '@renderer/App';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { ingredientsService } from '@renderer/app/services/ingredientsService';
import { CreateIngredientParams } from '@renderer/app/services/ingredientsService/create';
import { isEmoji } from '@renderer/app/utils/isEmoji';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

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

export default function useNewIngredientModal(
  onCreate: () => void,
  isOpen: boolean,
) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(categoryFormSchema),
  });

  const { mutateAsync: createIngredient, isPending: isLoading } = useMutation({
    mutationFn: (data: CreateIngredientParams) =>
      ingredientsService.create(data),
    onSuccess: (newIngredient: Ingredient) => {
      queryClient.setQueryData(
        ['ingredients', 'getAll'],
        (ingredients: Ingredient[]) => [...ingredients, newIngredient],
      );
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await createIngredient(data);
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
