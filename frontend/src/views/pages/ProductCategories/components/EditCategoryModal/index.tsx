import { IProductCategory } from '@app/entities/ProductCategories';
import { Modal } from '@views/components/ui/Modal';
import { ProductCategoryForm } from '@views/forms/ProductCategoryForm';

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
  if (!category) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} title="Editar categoria">
      <ProductCategoryForm
        buttonLabel="Salvar alterações"
        onConfirm={(form) => console.log({ form })}
        defaultValues={category}
      />
    </Modal>
  );
}
