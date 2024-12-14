import { DeleteRoundedIcon } from '@renderer/assets/Icons/DeleteRoundedIcon';
import Button from '@renderer/views/components/Button';
import Modal from '@renderer/views/components/Modal';
import { Actions, CancelButton, Container, Content } from './styles';
import useDeleteModal from './useDeleteModal';

interface DeleteModalProps {
  open: boolean;
  children?: React.ReactNode;
  onClose(): void;
  description?: string;
  answer: string;
  onConfirm(): void;
}

export default function DeleteModal({ open, description, answer, onClose, onConfirm }: DeleteModalProps) {
  const { isLoading, handleConfirmButton } = useDeleteModal({ onClose, onConfirm });

  return (
    <Modal
      open={open}
      title="Excluir"
      onClose={onClose}
    >
      <Container>
        <Content>
          <DeleteRoundedIcon />
          <strong>{answer}</strong>

          {description && <p>{description}</p>}
        </Content>
        <Actions>
          <Button danger onClick={handleConfirmButton} isLoading={isLoading}>
            Sim, desejo excluir
          </Button>
          <CancelButton onClick={onClose}>
            Cancelar
          </CancelButton>
        </Actions>
      </Container>
    </Modal>
  );
}
