import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { queryClient } from '@renderer/App';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { productCategoriesService } from '@renderer/app/services/productCategoriesService';
import { CreateProductCategoryParams } from '@renderer/app/services/productCategoriesService/create';
import { ProductCategoryFormData } from '../ProductCategoryForm/useProductCategoryForm';

import toast from '@renderer/app/utils/toast';

export default function useNewCategoryModal(onCreate: () => void) {
  const { mutateAsync: createCategory, isPending: isLoading } = useMutation({
    mutationFn: (data: CreateProductCategoryParams) => productCategoriesService.create(data),
    onSuccess: (newCategory: ProductCategory) => {
      queryClient.setQueryData(
        ['product-categories', 'getAll'],
        (categories: ProductCategory[]) => [...categories, newCategory],
      );
    },
  });

  async function handleSubmit(data: ProductCategoryFormData) {
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
  }

  return {
    isLoading,
    handleSubmit,
  };
}
