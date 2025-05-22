import { Trash2Icon } from 'lucide-react';

import { IProduct } from '@app/entities/Product';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { RemoveModal } from '@views/components/app/RemoveModal';
import { Button } from '@views/components/ui/Button';
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
  const {
    handleCloseRemoveProductModal,
    handleOpenRemoveProductModal,
    handleConfirmRemove,
    handleSubmit,
    isRemoving,
    isLoading,
    isOpenRemoveProductModal,
  } = useEditProductModalController({
    product,
    onSuccess: onClose,
  });

  if (!product) {
    return null;
  }

  if (isOpenRemoveProductModal) {
    return (
      <RemoveModal
        open
        warn="Tem certeza que deseja excluir este produto?"
        onClose={handleCloseRemoveProductModal}
        onConfirm={handleConfirmRemove}
        isLoading={isRemoving}
      />
    );
  }

  return (
    <Modal
      open={open}
      title={capitalizeFirstLetter(product.name)}
      onClose={onClose}
      rightAction={
        <Button
          className="w-full"
          type="button"
          variant="ghost"
          onClick={handleOpenRemoveProductModal}
        >
          <Trash2Icon className="size-5 text-red-900" />
        </Button>
      }
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
