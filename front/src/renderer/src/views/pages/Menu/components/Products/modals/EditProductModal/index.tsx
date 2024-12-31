import Modal from '@renderer/views/components/Modal';
import UploadImage from '../../UploadImage';
import useEditProductModal from './useEditProductModal';

import { Product } from '@renderer/app/entities/Product';

import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import NewIngredientModal from '../../../Ingredients/NewIngredientModal';
import CategoriesSection from '../../CategoriesSection';
import IngredientsSection from '../../IngredientsSection';
import { Container, Content, Footer, ImageSection, InputsContainer } from './styles';

interface EditProductModalProps {
  open: boolean;
  onClose?(): void;
  product: Product | null;
}

export default function EditProductModal({ open, onClose, product }: EditProductModalProps) {
  const {
    errors,
    width,
    selectedCategory,
    selectedIngredients,
    previewImageUrl,
    openNewIngredientModal,
    register,
    handleSelectedCategory,
    handleSelectedIngredients,
    handleSubmit,
    handleUploadImage,
    handleCloseNewIngredientModal,
    handleOpenNewIngredientModal,
  } = useEditProductModal(product);

  if (openNewIngredientModal) {
    return <NewIngredientModal open onClose={handleCloseNewIngredientModal} />;
  }

  return (
    <Modal
      title="Editar produto"
      open={open}
      onClose={onClose}
      $maxWidth={width < 1024 ? '500px' : '928px'}
    >
      <Container>
        <Content>
          <ImageSection>
            <h3>Imagem</h3>

            <UploadImage onUpload={handleUploadImage} previewImageUrl={previewImageUrl || product?.imagePath} />
          </ImageSection>

          <InputsContainer>
            <Input
              type="text"
              placeholder="Nome do produto"
              {...register('name')}
              $error={errors.name?.message}
            />

            <Input
              type="text"
              placeholder="Descrição"
              maxLength={110}
              {...register('description')}
              $error={errors.description?.message}
            />

            <p>Máximo 110 caracteres</p>
          </InputsContainer>

          <CategoriesSection
            $error={errors.category?.message}
            onSelect={handleSelectedCategory}
            selectedCategory={selectedCategory}
          />

          <IngredientsSection
            openNewIngredientModal={handleOpenNewIngredientModal}
            onSelected={handleSelectedIngredients}
            selectedIngredients={selectedIngredients}
          />
        </Content>

        <Footer>
          <Button onClick={handleSubmit}>Adicionar produtos</Button>
        </Footer>
      </Container>
    </Modal>
  );
}
