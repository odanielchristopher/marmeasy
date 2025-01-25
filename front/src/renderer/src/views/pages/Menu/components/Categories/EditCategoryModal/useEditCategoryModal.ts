import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { queryClient } from '@renderer/App';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { productCategoriesService } from '@renderer/app/services/productCategoriesService';
import { UpdateProductCategoryParams } from '@renderer/app/services/productCategoriesService/update';
import { ProductCategoryFormData } from '../ProductCategoryForm/useProductCategoryForm';

import toast from '@renderer/app/utils/toast';

export default function useEditCategoryModal(
  category: ProductCategory | null,
  onConfirm: () => void,
) {
  const { mutateAsync: updateCategory, isPending: isLoading } = useMutation({
    mutationFn: async (data: UpdateProductCategoryParams) => productCategoriesService.update(data),
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

  async function handleSubmit(data: ProductCategoryFormData) {
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
  }

  return {
    isLoading,
    handleSubmit,
  };
}
