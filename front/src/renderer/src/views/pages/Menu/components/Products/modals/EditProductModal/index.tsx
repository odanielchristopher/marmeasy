import Modal from '@renderer/views/components/Modal';
import UploadImage from '../../UploadImage';
import useEditProductModal from './useEditProductModal';

import { Product } from '@renderer/app/entities/Product';

import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import { NumericInput } from '@renderer/views/components/NumericInput';
import { Controller } from 'react-hook-form';
import NewIngredientModal from '../../../Ingredients/NewIngredientModal';
import CategoriesSection from '../../CategoriesSection';
import IngredientsSection from '../../IngredientsSection';
import { Container, Content, Footer, ImageSection, InputsContainer } from './styles';

interface EditProductModalProps {
  open: boolean;
  onClose(): void;
  product: Product | null;
}

export default function EditProductModal({ open, onClose, product }: EditProductModalProps) {
  const {
    errors,
    width,
    control,
    selectedCategoryId,
    selectedIngredientsIds,
    previewImageUrl,
    openNewIngredientModal,
    register,
    handleSelectedCategory,
    handleSelectedIngredients,
    handleSubmit,
    handleUploadImage,
    handleCloseNewIngredientModal,
    handleOpenNewIngredientModal,
  } = useEditProductModal(product, onClose);

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
          <Button onClick={handleSubmit}>Salvar alterações</Button>
        </Footer>
      </Container>
    </Modal>
  );
}
