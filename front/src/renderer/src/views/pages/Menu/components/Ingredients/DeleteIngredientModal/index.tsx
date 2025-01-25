import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';

import Button from '@renderer/views/components/Button';
import Modal from '@renderer/views/components/Modal';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import {
  Actions,
  CancelButton,
  CategoryContainer,
  Container,
  Warning,
} from './styles';
import useDeleteIngredientModal from './useDeleteIngredientModal';

interface DeleteIngredientModalProps {
  open: boolean;
  onClose(): void;
  ingredient: Ingredient | null;
}

export default function DeleteIngredientModal({
  open,
  onClose,
  ingredient,
}: DeleteIngredientModalProps) {
  const { handleConfirm, isloading } = useDeleteIngredientModal(
    ingredient,
    onClose,
  );

  return (
    <Modal title="Excluir ingrediente" open={open} onClose={onClose}>
      <Container>
        <Warning>Tem certeza que deseja excluir a ingrediente?</Warning>

        <CategoryContainer>
          <span>{ingredient?.icon}</span>
          <span>{capitalizeFirstLetter(ingredient?.name || '')}</span>
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
