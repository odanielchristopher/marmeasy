import { Modal } from '@views/components/ui/Modal';
import { ProductForm } from '@views/forms/ProductForm';

interface INewProductModalProps {
  open: boolean;
  onClose(): void;
}

export function NewProductModal({ open, onClose }: INewProductModalProps) {
  return (
    <Modal open={open} title="Novo produto" onClose={onClose}>
      <ProductForm
        buttonLabel="Criar produto"
        onSubmit={(formData) => {
          console.log(formData);
          onClose();
        }}
      />
    </Modal>
  );
}
