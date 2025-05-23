import toast from 'react-hot-toast';

import { IProductCategory } from '@app/entities/ProductCategories';
import { useUpdateProductCategory } from '@app/hooks/productCategories/useUpdateProductCategory';
import { ProductCategoryForm } from '@views/forms/ProductCategoryForm/schema';

interface IUseEditCategoryModalController {
  category: IProductCategory | null;
  onSuccess(): void;
}

export function useEditCategoryModalController({
  category,
  onSuccess,
}: IUseEditCategoryModalController) {
  const { updateCategory, isLoading } = useUpdateProductCategory();

  async function handleSubmit(formData: ProductCategoryForm) {
    try {
      await updateCategory({
        ...formData,
        id: category!.id,
      });

      toast.success('Categoria alterada com sucesso!');
      onSuccess();
    } catch {
      toast.error('Ocorreu um erro ao editar sua categoria!');
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}
