import { useState } from 'react';

import { IProduct } from '@app/entities/IProduct';
import { products } from '@app/mocks/products';

export function useProductsController() {
  const [isOpenNewProductModal, setIsOpenNewProductModal] = useState(false);
  const [isOpenEditProductModal, setIsOpenEditProductModal] = useState(false);
  const [productBeenEdited, setProductBeenEdited] = useState<IProduct | null>(
    null,
  );

  function handleOpenNewProductModal() {
    setIsOpenNewProductModal(true);
  }

  function handleCloseNewProductModal() {
    setIsOpenNewProductModal(false);
  }

  function handleOpenEditProductModal(product: IProduct) {
    setProductBeenEdited(product);
    setIsOpenEditProductModal(true);
  }

  function handleCloseEditProductModal() {
    setProductBeenEdited(null);
    setIsOpenEditProductModal(false);
  }

  return {
    isOpenEditProductModal,
    isOpenNewProductModal,
    productBeenEdited,
    products,
    handleOpenEditProductModal,
    handleOpenNewProductModal,
    handleCloseEditProductModal,
    handleCloseNewProductModal,
  };
}
