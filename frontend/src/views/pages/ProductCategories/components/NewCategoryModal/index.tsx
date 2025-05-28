import { Modal } from '@views/components/ui/Modal';
import { ProductCategoryForm } from '@views/forms/ProductCategoryForm';

import { useNewCategoryModalController } from './useNewCategoryModalController';

interface INewCategoryModalProps {
  open: boolean;
  onClose(): void;
}

export function NewCategoryModal({ open, onClose }: INewCategoryModalProps) {
  const { handleSubmit, isLoading } = useNewCategoryModalController(onClose);

  return (
    <Modal open={open} onClose={onClose} title="Nova categoria">
      <ProductCategoryForm
        buttonLabel="Criar categoria"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  );
}
