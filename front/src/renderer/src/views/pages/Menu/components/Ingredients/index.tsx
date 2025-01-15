import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import { Pencil } from '@renderer/assets/Icons/Pencil';
import { Table } from '@renderer/views/components/Table';

import DeleteIngredientModal from './DeleteIngredientModal';
import EditIngredientModal from './EditIngredientModal';
import NewIngredientModal from './NewIngredientModal';

import useIngredients from './useIngredients';

import Loader from '@renderer/views/components/Loader';
import { ActionButton, Container, Header, LoaderContainer, Title } from './styles';

export default function Ingredients() {
  const {
    sortedIngredients,
    isLoading,
    ingredientBeignDeleted,
    ingredientBeingEdited,
    openDeleteModal,
    openEditModal,
    openNewIngredientModal,
    handleCloseDeleteModal,
    handleCloseEditModal,
    handleCloseNewIngredientModal,
    handleOpenDeleteModal,
    handleOpenEditModal,
    handleOpenNewIngredientModal,
  } = useIngredients();

  return (
    <>
      {ingredientBeingEdited && (
        <EditIngredientModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          ingredient={ingredientBeingEdited}
        />
      )}

      {ingredientBeignDeleted && (
        <DeleteIngredientModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          ingredient={ingredientBeignDeleted}
        />
      )}

      <NewIngredientModal open={openNewIngredientModal} onClose={handleCloseNewIngredientModal} />
      <Container>
        <Header>
          <div className="infos">
            <Title>Ingredientes</Title>
            <span>{sortedIngredients.length}</span>
          </div>

          <button onClick={handleOpenNewIngredientModal}>Adicionar ingrediente</button>
        </Header>

        <Table.Container>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCollumn style={{ width: '5%' }}>Emoji</Table.HeaderCollumn>
              <Table.HeaderCollumn>Nome</Table.HeaderCollumn>
              <Table.HeaderCollumn style={{ width: '12%' }}>Ações</Table.HeaderCollumn>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedIngredients.map((ingredient) => (
              <Table.Row key={ingredient.id}>
                <Table.Cell style={{ textAlign: 'center' }}>{ingredient.icon}</Table.Cell>
                <Table.Cell>{capitalizeFirstLetter(ingredient.name)}</Table.Cell>
                <Table.Cell style={{ display: 'flex', gap: '.4rem' }}>
                  <ActionButton onClick={() => handleOpenEditModal(ingredient)}>
                    <Pencil />
                  </ActionButton>
                  <ActionButton onClick={() => handleOpenDeleteModal(ingredient)}>
                    <DeleteIcon />
                  </ActionButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Container>

        {isLoading && (
          <LoaderContainer>
            <Loader $isLoading size={32} />
          </LoaderContainer>
        )}
      </Container>
    </>
  );
}
