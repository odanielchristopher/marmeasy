import { Product } from '@renderer/app/entities/Product';
import Modal from '@renderer/views/components/Modal';
import React from 'react';
import ItemForm from '../ItemForm';
import { OrderDetail } from '../ItemForm/useItemForm';
import { Container } from './styles';
import useNewItemModal from './useNewItemModal';


interface NewItemModalProps {
  open: boolean;
  children?: React.ReactNode;
  onClose(): void;
  description?: string;
  answer: string;
  product: Product;
  title: string;
  onSubmit(details: OrderDetail, product: Product): void;
  hasIngredients: boolean;
}


export default function NewItemModal({
  open,
  answer,
  onClose,
  product,
  title,
  onSubmit,
  hasIngredients,
}: NewItemModalProps) {
  const {
    handleConfirmNewItem,
  } = useNewItemModal({ product, onClose, onSubmit });

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <Container>
        {answer}
        <ItemForm
          product={product}
          onSubmit={handleConfirmNewItem}
          onClose={onClose}
          hasIngredients={hasIngredients}
        />
      </Container>
    </Modal>
  );
}
