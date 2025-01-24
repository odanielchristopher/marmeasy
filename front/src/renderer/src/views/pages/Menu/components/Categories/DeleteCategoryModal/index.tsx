import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';

import Button from '@renderer/views/components/Button';
import Modal from '@renderer/views/components/Modal';

import {
  Actions,
  CancelButton,
  CategoryContainer,
  Container,
  Warning,
} from './styles';
import useDeleteCategoryModal from './useDeleteCategoryModal';

interface DeleteProductModalProps {
  open: boolean;
  onClose(): void;
  category: ProductCategory | null;
}

export default function DeleteCategoryModal({
  open,
  onClose,
  category,
}: DeleteProductModalProps) {
  const { handleConfirm, isloading } = useDeleteCategoryModal(
    category,
    onClose,
  );

  return (
    <Modal title="Excluir categoria" open={open} onClose={onClose}>
      <Container>
        <Warning>Tem certeza que deseja excluir a categoria?</Warning>

        <CategoryContainer>
          <span>{category?.icon}</span>
          <span>{capitalizeFirstLetter(category?.name || '')}</span>
        </CategoryContainer>

        <Actions>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <Button danger isLoading={isloading} onClick={handleConfirm}>
            Sim, desejo excluir
          </Button>
        </Actions>
      </Container>
    </Modal>
  );
}
