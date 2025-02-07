import { Product } from '@renderer/app/entities/Product';
import Modal from '@renderer/views/components/Modal';
import React from 'react';
import ItemForm from '../ItemForm';
import { OrderDetail } from '../ItemForm/useItemForm';
import { Container } from './styles';
import useEditModal from './useEditModal';

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
  addProductToOrder(details: OrderDetail): void;
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
  const {
    handleConfimEdit,
  } = useEditModal(index, onClose, setOrderDetails, orderDetails);

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <Container>
        {answer}
        <ItemForm
          product={product}
          onSubmit={ handleConfimEdit }
          onClose={onClose}
          order={orderDetails[index]}
          hasIngredients={hasIngredients}
        />
      </Container>
    </Modal>
  );
}
