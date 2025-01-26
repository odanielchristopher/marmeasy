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
import { CgCloseO } from 'react-icons/cg';
import {
  Container,
  Content,
  Footer,
  ImageSection,
  InputsContainer,
} from './styles';

interface NewProductModalProps {
  open: boolean;
  onClose(): void;
}

export default function NewProductModal({
  open,
  onClose,
}: NewProductModalProps) {
  const {
    errors,
    width,
    control,
    isLoading,
    selectedCategoryId,
    selectedIngredientsIds,
    previewImageUrl,
    openNewIngredientModal,
    register,
    handleSelectedCategory,
    handleSelectedIngredients,
    handleSubmit,
    handleAddUploadImage,
    handleRemoveUploadImage,
    handleCloseNewIngredientModal,
    handleOpenNewIngredientModal,
  } = useNewProductModal(onClose);

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
            <header>
              <h3>Imagem</h3>

              {errors.image && (
                <div className="error">
                  <CgCloseO color="#F63131" />
                  <span>{errors.image.message}</span>
                </div>
              )}
            </header>

            <UploadImage
              onUpload={handleAddUploadImage}
              onRemoveImg={handleRemoveUploadImage}
              previewImageUrl={previewImageUrl}
            />
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
            $error={errors.categoryId?.message}
            onSelect={handleSelectedCategory}
            selectedCategoryId={selectedCategoryId}
          />

          <IngredientsSection
            openNewIngredientModal={handleOpenNewIngredientModal}
            onSelected={handleSelectedIngredients}
            selectedIngredientsIds={selectedIngredientsIds}
          />
        </Content>

        <Footer>
          <Button onClick={handleSubmit} isLoading={isLoading}>
            Adicionar produto
          </Button>
        </Footer>
      </Container>
    </Modal>
  );
}
