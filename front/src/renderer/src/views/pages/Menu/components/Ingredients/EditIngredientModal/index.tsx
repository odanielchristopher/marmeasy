import { Ingredient } from '@renderer/app/entities/Ingredient';
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';
import { CancelButton, Container, Footer, Form } from './styles';
import useEditIngredientModal from './useEditIngredientModal';

interface EditIngredientModalProps {
  open: boolean;
  onClose(): void;
  ingredient: Ingredient | null;
}

export default function EditCategoryModal({ open, onClose, ingredient }: EditIngredientModalProps) {
  const {
    errors,
    isLoading,
    register,
    handleSubmit,
  } = useEditIngredientModal(ingredient, onClose);

  return (
    <Modal
      title="Editar ingrediente"
      open={open}
      onClose={onClose}
    >
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          <p>Aqui estão os dados do ingrediente</p>

          <Input
            type="text"
            placeholder="Emoji*"
            $error={errors.icon?.message}
            {...register('icon')}
          />

          <Input
            type="text"
            placeholder="Nome*"
            $error={errors.name?.message}
            {...register('name')}
          />

          <Footer>
            <CancelButton onClick={onClose}>
              Cancelar
            </CancelButton>
            <Button type="submit" isLoading={isLoading}>
              Salvar alterações
            </Button>
          </Footer>
        </Form>


      </Container>
    </Modal>
  );
}
