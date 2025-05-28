import toast from 'react-hot-toast';

import { useCreateProduct } from '@app/hooks/products/useCreateProduct';
import { ProductFormData } from '@views/forms/ProductForm/schema';

export function useNewProductModalController(onSuccess: () => void) {
  const { createProduct, isLoading } = useCreateProduct();

  async function handleSubmit({
    name,
    price,
    description,
    categoryId,
    imagePath,
  }: ProductFormData) {
    try {
      await createProduct({
        name,
        description,
        categoryId,
        price: Number(price),
        imagePath: typeof imagePath !== 'string' ? imagePath : undefined,
      });

      toast.success('Produto criado com sucesso');
      onSuccess();
    } catch {
      toast.error('Ocorreu um erro ao criar o cliente');
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}
