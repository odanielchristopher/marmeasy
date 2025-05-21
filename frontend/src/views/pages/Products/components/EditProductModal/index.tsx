import { IProduct } from '@app/entities/Product';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { Modal } from '@views/components/ui/Modal';
import { ProductForm } from '@views/forms/ProductForm';

import { useEditProductModalController } from './useEditProductModalController';

interface IEditProductModalProps {
  open: boolean;
  onClose(): void;
  product: IProduct | null;
}

export function EditProductModal({
  open,
  product,
  onClose,
}: IEditProductModalProps) {
  const { handleSubmit, isLoading } = useEditProductModalController({
    product,
    onSuccess: onClose,
  });

  if (!product) {
    return null;
  }

  return (
    <Modal
      open={open}
      title={capitalizeFirstLetter(product.name)}
      onClose={onClose}
    >
      <ProductForm
        defaultValues={{
          ...product,
          categoryId: product.category?.id,
        }}
        buttonLabel="Editar produto"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  );
}
