import { Product } from '@renderer/app/entities/Product';
import Modal from '@renderer/views/components/Modal';
import React from 'react';
import ItemForm from '../ItemForm';
import { OrderDetail } from '../ItemForm/useItemForm';
import { Container } from './styles';


interface IngredientsModalProps {
  open: boolean;
  children?: React.ReactNode;
  onClose(): void;
  description?: string;
  answer: string;
  product: Product;
  title: string;
  onSubmit(details: OrderDetail): void;
}


export default function IngredientsModal({
  open,
  answer,
  onClose,
  product,
  title,
  onSubmit : addProductToOrder,
}: IngredientsModalProps) {

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <Container>
        {answer}
        <ItemForm
          product={product}
          onSubmit={addProductToOrder}
          onClose={onClose}
        />
      </Container>
    </Modal>
  );
}
