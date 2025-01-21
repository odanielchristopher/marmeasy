import UploadImage from '../UploadImage';
import useProductForm, { ProductFormData } from './useProductForm';

import { Product } from '@renderer/app/entities/Product';

import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import { NumericInput } from '@renderer/views/components/NumericInput';
import { Controller } from 'react-hook-form';
import CategoriesSection from '../CategoriesSection';
import IngredientsSection from '../IngredientsSection';
import { Content, Footer, ImageSection, InputsContainer } from './styles';

interface EditProductModalProps {
  product?: Product | null
  isLoading: boolean
  onSubmit(data: ProductFormData): Promise<void>
  onSuccess?(): void
  onOpenIngredientModal(): void
}

export default function ProductForm({
  product,
  isLoading,
  onSubmit,
  onSuccess,
  onOpenIngredientModal,
}: EditProductModalProps) {
  const {
    errors,
    control,
    selectedCategoryId,
    selectedIngredientsIds,
    previewImageUrl,
    register,
    handleSelectedCategory,
    handleSelectedIngredients,
    handleSubmit,
    handleAddUploadImage,
    handleRemoveUploadImage,
  } = useProductForm({
    product,
    onSubmit,
    onSuccess,
  });

  return (
    <>
      <Content>
        <ImageSection>
          <h3>Imagem</h3>

          <UploadImage
            onUpload={handleAddUploadImage}
            onRemoveImg={handleRemoveUploadImage}
            previewImageUrl={previewImageUrl}
          />
        </ImageSection>

        <InputsContainer>
          <Input
            type="text"
            placeholder="Nome do produto*"
            {...register('name')}
            $error={errors.name?.message}
            maxLength={30}
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
                placeholder="Valor do produto*"
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
          openNewIngredientModal={onOpenIngredientModal}
          onSelected={handleSelectedIngredients}
          selectedIngredientsIds={selectedIngredientsIds}
        />
      </Content>

      <Footer>
        <Button onClick={handleSubmit} isLoading={isLoading}>
          Salvar alterações
        </Button>
      </Footer>
    </>
  );
}
