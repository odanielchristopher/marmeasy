import toast from 'react-hot-toast';

import { IProductCategory } from '@app/entities/ProductCategories';
import { useRemoveProductCategory } from '@app/hooks/productCategories/useRemoveProductCategory';

interface IUseRemoveCategoryModal {
  category: IProductCategory | null;
  onSuccess(): void;
}

export function useRemoveCategoryModal({
  category,
  onSuccess,
}: IUseRemoveCategoryModal) {
  const { removeCategory, isLoading } = useRemoveProductCategory(category?.id);

  async function handleSubmit() {
    try {
      await removeCategory(category!.id);

      toast.success('Categoria removida com sucesso!');
      onSuccess();
    } catch {
      toast.error('Ocorreu um erro ao remover sua categoria!');
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}
