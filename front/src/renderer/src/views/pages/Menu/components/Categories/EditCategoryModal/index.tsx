import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';
import { CancelButton, Container, Footer, Form } from './styles';
import useEditCategoryModal from './useEditCategoryModal';

interface EditProductModalProps {
  open: boolean;
  onClose(): void;
  category: ProductCategory | null;
}

export default function EditCategoryModal({ open, onClose, category }: EditProductModalProps) {
  const {
    errors,
    isLoading,
    register,
    handleSubmit,
  } = useEditCategoryModal(category, onClose);

  return (
    <Modal
      title="Editar categoria"
      open={open}
      onClose={onClose}
    >
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          <p>Aqui estão os dados da categoria</p>

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
