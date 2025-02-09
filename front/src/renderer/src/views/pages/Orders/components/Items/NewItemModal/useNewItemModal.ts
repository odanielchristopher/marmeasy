import { Product } from '@renderer/app/entities/Product';
import { OrderDetail } from '../ItemForm/useItemForm';

interface NewItemModalProps {
  product: Product;
  onClose: () => void;
  onSubmit(details: OrderDetail, product: Product): void;
}

export default function useNewItemModal({ product, onClose, onSubmit: addProductToOrder }: NewItemModalProps) {
  const handleConfirmNewItem = (details: OrderDetail) => {
    addProductToOrder(details, product);
    onClose();
  };

  return {
    handleConfirmNewItem,
  };
}
