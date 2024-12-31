import Modal from '@renderer/views/components/Modal';

import * as Checkbox from '@radix-ui/react-checkbox';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Loader from '@renderer/views/components/Loader';
import { CgCloseO } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa6';
import NewIngredientModal from '../../Ingredients/NewIngredientModal';
import UploadImage from '../UploadImage';
import {
  CategoryItem,
  CategoryList,
  CategorySection,
  Container,
  Content,
  Footer,
  ImageSection,
  IngredientsSection,
  InputsContainer,
  StyledRdxCheckbox,
} from './styles';
import useNewProductModal from './useNewProductModal';

interface NewProductModalProps {
  open: boolean
  onClose?(): void
}

export default function NewProductModal({ open, onClose }: NewProductModalProps) {
  const {
    errors,
    width,
    ingredients,
    isLoadingIngredients,
    categories,
    isLoadingCategories,
    selectedCategory,
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
          </InputsContainer>

          <CategorySection>
            <header>
              <p className="title">Categoria</p>

              {errors.category && (
                <span className="error">
                  <CgCloseO color="#F63131" />
                  {errors.category.message}
                </span>
              )}
            </header>

            <CategoryList>
              {isLoadingCategories && (
                <div className='categories-loader'>
                  <Loader size={14} $isLoading/>
                </div>
              )}

              {!isLoadingCategories && (
                categories.map((categorie, key) => (
                  <CategoryItem
                    key={key}
                    $selected={categorie.id === selectedCategory?.id}
                    onClick={() => handleSelectedCategory(categorie)}
                    tabIndex={0} // Permite navegação por teclado
                    onKeyDown={(e) => e.key === 'Enter' && handleSelectedCategory(categorie)}
                  >
                    <span>{categorie.icon}</span>
                    <span>{capitalizeFirstLetter(categorie.name)}</span>
                  </CategoryItem>
                ))
              )}
            </CategoryList>
          </CategorySection>

          <IngredientsSection>
            <header>
              <h3>Ingredientes</h3>
              <button onClick={handleOpenNewIngredientModal}>Novo ingrediente</button>
            </header>

            <div className="filter">
              <span>Busque o ingrediente</span>

              <input type="text" placeholder="Ex: Baião" />
            </div>

            <div className="list">
              {isLoadingIngredients && (
                <div className="ingredient-loader">
                  <Loader $isLoading size={24} />
                </div>
              )}

              {!isLoadingIngredients &&
                ingredients.map((ingredient, key) => (
                  <label className="item" htmlFor={ingredient.id} key={key}>
                    <span>
                      {ingredient.icon} {ingredient.name}
                    </span>

                    <StyledRdxCheckbox
                      id={ingredient.id}
                      onCheckedChange={() => handleSelectedIngredients(ingredient)}
                    >
                      <Checkbox.Indicator className="indicator">
                        <FaCheck size={10} />
                      </Checkbox.Indicator>
                    </StyledRdxCheckbox>
                  </label>
                ))}
            </div>
          </IngredientsSection>
        </Content>

        <Footer>
          <Button onClick={handleSubmit}>Adicionar produtos</Button>
        </Footer>
      </Container>
    </Modal>
  );
}
