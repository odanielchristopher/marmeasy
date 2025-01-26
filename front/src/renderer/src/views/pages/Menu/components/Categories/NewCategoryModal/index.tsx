import Modal from '@renderer/views/components/Modal';
import ProductCategoryForm from '../ProductCategoryForm';
import { Container } from './styles';
import useNewCategoryModal from './useNewCategoryModal';

interface EditProductModalProps {
  open: boolean;
  onClose(): void;
}

export default function NewCategoryModal({
  open,
  onClose,
}: EditProductModalProps) {
  const { isLoading, handleSubmit } = useNewCategoryModal(onClose);

  return (
    <Modal title="Nova categoria" open={open} onClose={onClose}>
      <Container>
        <ProductCategoryForm onSubmit={handleSubmit} isLoading={isLoading} buttonLabel='Criar categoria' />
      </Container>
    </Modal>
  );
}
