import { Modal } from '@views/components/ui/Modal';
import { ProductCategoryForm } from '@views/forms/ProductCategoryForm';

interface INewCategoryModalProps {
  open: boolean;
  onClose(): void;
}

export function NewCategoryModal({ open, onClose }: INewCategoryModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Nova categoria">
      <ProductCategoryForm
        buttonLabel="Criar categoria"
        onConfirm={(form) => console.log({ form })}
      />
    </Modal>
  );
}
