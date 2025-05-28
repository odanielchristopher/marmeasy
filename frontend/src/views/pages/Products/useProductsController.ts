import { useState } from 'react';

import { IProduct } from '@app/entities/Product';
import { useProducts } from '@app/hooks/products/useProducts';

export function useProductsController() {
  const [isOpenNewProductModal, setIsOpenNewProductModal] = useState(false);
  const [isOpenEditProductModal, setIsOpenEditProductModal] = useState(false);
  const [productBeenEdited, setProductBeenEdited] = useState<IProduct | null>(
    null,
  );

  const { products, isLoading } = useProducts();

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
    isLoading,
    hasProducts: products.length > 0,
    handleOpenEditProductModal,
    handleOpenNewProductModal,
    handleCloseEditProductModal,
    handleCloseNewProductModal,
  };
}
