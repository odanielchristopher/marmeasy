import { useState } from 'react';
import toast from 'react-hot-toast';

import { IProduct } from '@app/entities/Product';
import { useRemoveProduct } from '@app/hooks/products/useRemoveProduct';
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
  const [isOpenRemoveProductModal, setIsOpenRemoveProductModal] =
    useState(false);

  function handleOpenRemoveProductModal() {
    setIsOpenRemoveProductModal(true);
  }
  function handleCloseRemoveProductModal() {
    setIsOpenRemoveProductModal(false);
  }

  const { removeProduct, isLoading: isRemoving } = useRemoveProduct(
    product!.id,
  );

  async function handleConfirmRemove() {
    try {
      await removeProduct(product!.id);
      toast.success('Produto removido com sucesso!');
      setIsOpenRemoveProductModal(false);
      onSuccess();
    } catch {
      toast.error('Ocorreu um erro ao remover o produto!');
    }
  }

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
    isRemoving,
    isOpenRemoveProductModal,
    handleConfirmRemove,
    handleOpenRemoveProductModal,
    handleCloseRemoveProductModal,
    handleSubmit,
  };
}
