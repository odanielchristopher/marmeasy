import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';
import { Container, Form } from './styles';
import useNewCategoryModal from './useNewCategoryModal';

interface EditProductModalProps {
  open: boolean
  onClose(): void
}

export default function NewCategoryModal({ open, onClose }: EditProductModalProps) {
  const {
    errors,
    isLoading,
    register,
    handleSubmit,
  } = useNewCategoryModal(onClose, open);

  return (
    <Modal title="Nova categoria" open={open} onClose={onClose}>
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          <p>Escreva os dados da categoria</p>

          <Input
            type="text"
            placeholder="Emoji"
            $error={errors.icon?.message}
            {...register('icon')}
          />

          <Input
            type="text"
            placeholder="Nome"
            $error={errors.name?.message}
            {...register('name')}
          />

          <Button type="submit" isLoading={isLoading}>Adicionar nova categoria</Button>
        </Form>
      </Container>
    </Modal>
  );
}
