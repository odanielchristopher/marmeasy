import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';
import { Container, Form } from './styles';
import useNewIngredientModal from './useNewIngredientModal';

interface EditProductModalProps {
  open: boolean
  onClose(): void
}

export default function NewIngredientModal({ open, onClose }: EditProductModalProps) {
  const {
    errors,
    isLoading,
    register,
    handleSubmit,
  } = useNewIngredientModal(onClose, open);

  return (
    <Modal title="Novo Ingrediente" open={open} onClose={onClose}>
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          <p>Escreva os dados do ingrediente</p>

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

          <Button type="submit" isLoading={isLoading}>Adicionar novo ingrediente</Button>
        </Form>
      </Container>
    </Modal>
  );
}
