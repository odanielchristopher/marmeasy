import { IProductCategory } from '@app/entities/ProductCategories';
import { Modal } from '@views/components/ui/Modal';
import { ProductCategoryForm } from '@views/forms/ProductCategoryForm';

import { useEditCategoryModalController } from './useEditCategoryModalController';

interface IEditCategoryModalProps {
  open: boolean;
  category: IProductCategory | null;
  onClose(): void;
}

export function EditCategoryModal({
  open,
  category,
  onClose,
}: IEditCategoryModalProps) {
  const { handleSubmit, isLoading } = useEditCategoryModalController({
    category,
    onSuccess: onClose,
  });

  if (!category) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} title="Editar categoria">
      <ProductCategoryForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        defaultValues={category}
      />
    </Modal>
  );
}
