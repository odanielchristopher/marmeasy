import Modal from '@renderer/views/components/Modal';
import IngredientForm from '../IngredientForm';
import { Container } from './styles';
import useNewIngredientModal from './useNewIngredientModal';

interface EditProductModalProps {
  open: boolean;
  onClose(): void;
}

export default function NewIngredientModal({
  open,
  onClose,
}: EditProductModalProps) {
  const { isLoading, handleSubmit } = useNewIngredientModal(onClose);

  return (
    <Modal title="Novo Ingrediente" open={open} onClose={onClose}>
      <Container>
        <IngredientForm onSubmit={handleSubmit} isLoading={isLoading} />
      </Container>
    </Modal>
  );
}
