import { Modal } from '@views/components/ui/Modal';
import { ProductForm } from '@views/forms/ProductForm';

import { useNewProductModalController } from './useNewProductModalController';

interface INewProductModalProps {
  open: boolean;
  onClose(): void;
}

export function NewProductModal({ open, onClose }: INewProductModalProps) {
  const { handleSubmit, isLoading } = useNewProductModalController(onClose);

  return (
    <Modal open={open} title="Novo produto" onClose={onClose}>
      <ProductForm
        buttonLabel="Criar produto"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  );
}
