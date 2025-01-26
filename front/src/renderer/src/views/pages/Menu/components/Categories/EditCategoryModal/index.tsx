import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import Modal from '@renderer/views/components/Modal';
import ProductCategoryForm from '../ProductCategoryForm';
import { Container } from './styles';
import useEditCategoryModal from './useEditCategoryModal';

interface EditCategoryModalProps {
  open: boolean;
  onClose(): void;
  category: ProductCategory | null;
}

export default function EditCategoryModal({
  open,
  onClose,
  category,
}: EditCategoryModalProps) {
  const { isLoading, handleSubmit } = useEditCategoryModal(category, onClose);

  return (
    <Modal title="Editar categoria" open={open} onClose={onClose}>
      <Container>
        <ProductCategoryForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          category={category}
          onCancel={onClose}
          buttonLabel='Salvar alterações'
        />
      </Container>
    </Modal>
  );
}
