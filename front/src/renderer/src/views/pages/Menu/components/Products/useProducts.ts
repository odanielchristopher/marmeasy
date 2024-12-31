import { useCallback, useState } from 'react';

import { Product } from '@renderer/app/entities/Product';

export default function useProducts() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openNewProductModal, setOpenNewProductModal] = useState(false);

  const [productBeingDeleted, setProductBeingDeleted] = useState<Product | null>(null);
  const [productBeingEdited, setproductBeingEdited] = useState<Product | null>(null);

  const handleOpenEditModal = useCallback((product: Product) => {
    setproductBeingEdited(product);
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setproductBeingEdited(null);
    setOpenEditModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback((product: Product) => {
    setProductBeingDeleted(product);
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setproductBeingEdited(null);
    setOpenDeleteModal(false);
  }, []);

  const handleOpenNewProductModal = useCallback(() => {
    setOpenNewProductModal(true);
  }, []);

  const handleCloseNewProductModal = useCallback(() => {
    setOpenNewProductModal(false);
  }, []);

  return {
    productBeingDeleted,
    productBeingEdited,
    openEditModal,
    openDeleteModal,
    openNewProductModal,
    handleOpenEditModal,
    handleOpenDeleteModal,
    handleOpenNewProductModal,
    handleCloseEditModal,
    handleCloseDeleteModal,
    handleCloseNewProductModal,
  };
}
