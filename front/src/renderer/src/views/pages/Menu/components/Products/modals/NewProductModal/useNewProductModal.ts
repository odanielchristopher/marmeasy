import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { queryClient } from '@renderer/App';
import { Product } from '@renderer/app/entities/Product';
import { useWindowWidth } from '@renderer/app/hooks/useWindowWidth';
import { productsService } from '@renderer/app/services/productsService';
import { CreateProductParams } from '@renderer/app/services/productsService/create';
import { ProductFormData } from '../../ProductForm/useProductForm';

import toast from '@renderer/app/utils/toast';

export default function useNewProductModal(onSuccess: () => void) {
  const [openNewIngredientModal, setOpenNewIngredientModal] = useState(false);

  const width = useWindowWidth();

  function handleOpenNewIngredientModal() {
    setOpenNewIngredientModal(true);
  }

  function handleCloseNewIngredientModal() {
    setOpenNewIngredientModal(false);
  }

  const { mutateAsync: createProduct, isPending: isLoading } = useMutation({
    mutationFn: async (data: CreateProductParams) => productsService.create(data),
    onSuccess: (newCategory: Product) => {
      queryClient.setQueryData(
        ['products', 'getAll'],
        (categories: Product[]) => [...categories, newCategory],
      );
    },
  });

  async function handleSubmit(data: ProductFormData) {
    try {
      await createProduct(data);
      toast({
        type: 'success',
        text: 'Produto criado com sucesso.',
      });
      onSuccess();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao tentar criar produto.',
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
