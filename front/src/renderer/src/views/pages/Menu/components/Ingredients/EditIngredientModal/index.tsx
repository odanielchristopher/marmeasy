import { Ingredient } from '@renderer/app/entities/Ingredient';
import Modal from '@renderer/views/components/Modal';
import IngredientForm from '../IngredientForm';
import { Container } from './styles';
import useEditIngredientModal from './useEditIngredientModal';

interface EditIngredientModalProps {
  open: boolean;
  onClose(): void;
  ingredient: Ingredient | null;
}

export default function EditCategoryModal({
  open,
  onClose,
  ingredient,
}: EditIngredientModalProps) {
  const { isLoading, handleSubmit } = useEditIngredientModal({
    ingredientBeingEdited: ingredient,
    onSuccess: onClose,
  });

  return (
    <Modal title="Editar ingrediente" open={open} onClose={onClose}>
      <Container>
        <IngredientForm
          ingredient={ingredient}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </Container>
    </Modal>
  );
}
