import Modal from '@renderer/views/components/Modal';
import useEditProductModal from './useEditProductModal';

import { Product } from '@renderer/app/entities/Product';

import NewIngredientModal from '../../../Ingredients/NewIngredientModal';
import ProductForm from '../../ProductForm';
import { Container } from './styles';

interface EditProductModalProps {
  open: boolean;
  onClose(): void;
  product: Product | null;
}

export default function EditProductModal({
  open,
  onClose,
  product,
}: EditProductModalProps) {
  const {
    width,
    isLoading,
    openNewIngredientModal,
    handleSubmit,
    handleCloseNewIngredientModal,
    handleOpenNewIngredientModal,
  } = useEditProductModal(product, onClose);

  if (openNewIngredientModal) {
    return <NewIngredientModal open onClose={handleCloseNewIngredientModal} />;
  }

  return (
    <Modal
      title="Editar produto"
      open={open}
      onClose={onClose}
      $maxWidth={width < 1024 ? '500px' : '928px'}
    >
      <Container>
        <ProductForm
          product={product}
          onOpenIngredientModal={handleOpenNewIngredientModal}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          buttonLabel='Salvar alterações'
        />
      </Container>
    </Modal>
  );
}
