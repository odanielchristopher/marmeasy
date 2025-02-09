import React from 'react';

import Modal from '@renderer/views/components/Modal';
import ItemForm from '../ItemForm';
import useEditModal from './useEditModal';

import { Product } from '@renderer/app/entities/Product';
import { Container } from '../ItemForm/styles';
import { OrderDetail } from '../ItemForm/useItemForm';

interface EditModalProps {
  open: boolean;
  children?: React.ReactNode;
  onClose(): void;
  description?: string;
  answer: string;
  product: Product;
  title: string;
  index: number;
  order: OrderDetail;
  setOrderDetails: (details: OrderDetail[]) => void;
  orderDetails: OrderDetail[];
  hasIngredients: boolean;
}

export default function EditItemModal({
  open,
  answer,
  onClose,
  product,
  title,
  index,
  setOrderDetails,
  orderDetails,
  hasIngredients,
}: EditModalProps) {
  const { handleConfimEdit } = useEditModal(
    index,
    onClose,
    setOrderDetails,
    orderDetails,
  );

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <Container>
        {answer}
        <ItemForm
          product={product}
          onSubmit={handleConfimEdit}
          onClose={onClose}
          order={orderDetails[index]}
          hasIngredients={hasIngredients}
        />
      </Container>
    </Modal>
  );
}
