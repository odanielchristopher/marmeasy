import toast from 'react-hot-toast';

import { useCreateProduct } from '@app/hooks/products/useCreateProduct';
import { Modal } from '@views/components/ui/Modal';
import { ProductForm } from '@views/forms/ProductForm';
import { ProductFormData } from '@views/forms/ProductForm/schema';

interface INewProductModalProps {
  open: boolean;
  onClose(): void;
}

export function NewProductModal({ open, onClose }: INewProductModalProps) {
  const { createProduct, isLoading } = useCreateProduct();

  async function handleSubmit({
    name,
    price,
    description,
    categoryId,
    imagePath,
  }: ProductFormData) {
    try {
      await createProduct({
        name,
        description,
        categoryId,
        price: Number(price),
        imagePath: typeof imagePath !== 'string' ? imagePath : undefined,
      });

      toast.success('Produto criado com sucesso');
      onClose();
    } catch {
      toast.error('Ocorreu um erro ao criar o cliente');
    }
  }

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
