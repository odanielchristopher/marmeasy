import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';

import NewIngredientModal from '../../../Ingredients/NewIngredientModal';
import CategoriesSection from '../../CategoriesSection';
import IngredientsSection from '../../IngredientsSection';
import UploadImage from '../../UploadImage';

import useNewProductModal from './useNewProductModal';

import { NumericInput } from '@renderer/views/components/NumericInput';
import { Controller } from 'react-hook-form';
import { Container, Content, Footer, ImageSection, InputsContainer } from './styles';

interface NewProductModalProps {
  open: boolean
  onClose?(): void
}

export default function NewProductModal({ open, onClose }: NewProductModalProps) {
  const {
    errors,
    width,
    control,
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
  } = useNewProductModal();

  if (openNewIngredientModal) {
    return <NewIngredientModal open onClose={handleCloseNewIngredientModal} />;
  }

  return (
    <Modal
      title="Novo produto"
      open={open}
      onClose={onClose}
      $maxWidth={width < 1024 ? '500px' : '928px'}
    >
      <Container>
        <Content>
          <ImageSection>
            <h3>Imagem</h3>

            <UploadImage onUpload={handleUploadImage} previewImageUrl={previewImageUrl} />
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

            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, value, name } }) => (
                <NumericInput
                  name={name}
                  placeholder="Valor do produto"
                  $error={errors.price?.message}
                  onInputChange={onChange}
                  value={value}
                />
              )}
            />
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
