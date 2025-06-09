import toast from 'react-hot-toast';

import { useCreateProductCategory } from '@app/hooks/productCategories/useCreateProductCategory';
import { ProductCategoryForm } from '@views/forms/ProductCategoryForm/schema';

export function useNewCategoryModalController(onSuccess: () => void) {
  const { createCategory, isLoading } = useCreateProductCategory();

  async function handleSubmit(formData: ProductCategoryForm) {
    try {
      await createCategory(formData);

      toast.success('Categoria criada com sucesso!');
      onSuccess();
    } catch {
      toast.error('Ocorreu um erro ao criar sua categoria!');
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}
