import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { queryClient } from '@renderer/App';
import { Product } from '@renderer/app/entities/Product';
import { useWindowWidth } from '@renderer/app/hooks/useWindowWidth';
import { productsService } from '@renderer/app/services/productsService';
import { UpdateProductParams } from '@renderer/app/services/productsService/update';
import { ProductFormData } from '../../ProductForm/useProductForm';

import toast from '@renderer/app/utils/toast';

export default function useEditProductModal(product: Product | null, onSuccess: () => void) {
  const [openNewIngredientModal, setOpenNewIngredientModal] = useState(false);

  const width = useWindowWidth();

  function handleOpenNewIngredientModal() {
    setOpenNewIngredientModal(true);
  }

  function handleCloseNewIngredientModal() {
    setOpenNewIngredientModal(false);
  }

  const { mutateAsync: updateProduct, isPending: isLoading } = useMutation({
    mutationFn: async (data: UpdateProductParams) => productsService.update(data),
    onSuccess: (updatedProduct: Product) => {
      queryClient.setQueryData(['products', 'getAll'], (currentProducts: Product[]) => {

        return currentProducts.map((product) => product.id === updatedProduct.id ? updatedProduct : product);
      });
    },
  });

  async function handleSubmit(data: ProductFormData) {
    try {
      await updateProduct({
        ...data,
        id: product!.id,
      });
      toast({
        type: 'success',
        text: 'Produto editado com sucesso.',
      });
      onSuccess();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um error ao editar o produto.',
      });
    }
  }

  return {
    width,
    isLoading,
    openNewIngredientModal,
    handleOpenNewIngredientModal,
    handleCloseNewIngredientModal,
    handleSubmit,
  };
}
