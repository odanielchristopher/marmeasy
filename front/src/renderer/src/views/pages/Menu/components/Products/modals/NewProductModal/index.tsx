import Modal from '@renderer/views/components/Modal';

import NewIngredientModal from '../../../Ingredients/NewIngredientModal';

import useNewProductModal from './useNewProductModal';

import ProductForm from '../../ProductForm';
import { Container } from './styles';

interface NewProductModalProps {
  open: boolean;
  onClose(): void;
}

export default function NewProductModal({
  open,
  onClose,
}: NewProductModalProps) {
  const {
    width,
    isLoading,
    openNewIngredientModal,
    handleSubmit,
    handleCloseNewIngredientModal,
    handleOpenNewIngredientModal,
  } = useNewProductModal(onClose);

  if (openNewIngredientModal) {
    return <NewIngredientModal open onClose={handleCloseNewIngredientModal} />;
  }

  return (
    <Modal
      title="Novo produto"
      open={open}
      onClose={onClose}
      $maxWidth={width < 1024 ? '500px' : '928px'}
    >
      <Container>
        <ProductForm
          onSubmit={handleSubmit}
          onOpenIngredientModal={handleOpenNewIngredientModal}
          isLoading={isLoading}
        />
      </Container>
    </Modal>
  );
}
