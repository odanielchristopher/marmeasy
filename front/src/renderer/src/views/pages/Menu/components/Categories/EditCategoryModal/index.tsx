import Modal from '@renderer/views/components/Modal';
import { Container } from '../styles';

interface EditProductModalProps {
  open: boolean;
  onClose?(): void;
}

export default function EditCategoryModal({ open, onClose }: EditProductModalProps) {
  return (
    <Modal
      title="Editar produto"
      open={open}
      onClose={onClose}
      $maxWidth='92.8rem'
    >
      <Container>
        text
      </Container>
    </Modal>
  );
}
