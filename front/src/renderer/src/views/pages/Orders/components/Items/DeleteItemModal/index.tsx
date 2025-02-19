import Button from '@renderer/views/components/Button';
import Modal from '@renderer/views/components/Modal';

import { useDeleteModal } from './useDeleteModal';

import { Container } from '../ItemForm/styles';
import { OrderDetail } from '../ItemForm/useItemForm';

interface DeleteModalProps {
  open: boolean;
  onClose(): void;
  answer: string;
  title: string;
  index: number;
  setOrderDetails: (details: any) => void;
  orderDetails: OrderDetail[];
}

export default function DeleteItemModal({
  open,
  onClose,
  answer,
  title,
  index,
  setOrderDetails,
  orderDetails,
}: DeleteModalProps) {
  const { detailItem, handleConfirmDelete } = useDeleteModal({
    index,
    onClose,
    setOrderDetails,
    orderDetails,
  });

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <Container>
        {answer}
        <strong>{detailItem.productName}</strong>
        <Button
          onClick={() => {
            handleConfirmDelete();
          }}
        >
          Deletar
        </Button>
      </Container>
    </Modal>
  );
}
