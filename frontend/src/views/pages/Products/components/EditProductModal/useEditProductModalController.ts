import toast from 'react-hot-toast';

import { IProduct } from '@app/entities/Product';
import { useUpdateProduct } from '@app/hooks/products/useUpdateProduct';
import { ProductFormData } from '@views/forms/ProductForm/schema';

interface IUseEditProductModalController {
  onSuccess(): void;
  product: IProduct | null;
}

export function useEditProductModalController({
  product,
  onSuccess,
}: IUseEditProductModalController) {
  const { updateProduct, isLoading } = useUpdateProduct();

  async function handleSubmit(formData: ProductFormData) {
    try {
      await updateProduct({
        ...formData,
        id: product!.id,
        price: Number(formData.price),
        imagePath:
          typeof formData.imagePath !== 'string'
            ? formData.imagePath
            : undefined,
        removeImage: !!(product!.imagePath && !formData.imagePath),
      });
      toast.success('Produto alterado com sucesso!');
      onSuccess();
    } catch {
      toast.error('Ocorreu um erro ao alterar o produto!');
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}
