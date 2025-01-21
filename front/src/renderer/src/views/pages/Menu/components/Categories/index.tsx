import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import { Pencil } from '@renderer/assets/Icons/Pencil';
import { Table } from '@renderer/views/components/Table';

import DeleteCategoryModal from './DeleteCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import NewCategoryModal from './NewCategoryModal';

import useCategories from './useCategories';

import Loader from '@renderer/views/components/Loader';
import {
  ActionButton,
  Container,
  Header,
  LoaderContainer,
  Title,
} from './styles';

export default function Categories() {
  const {
    categories,
    isLoading,
    categoryBeignDeleted,
    categoryBeingEdited,
    openDeleteModal,
    openEditModal,
    openNewCategoryModal,
    handleCloseDeleteModal,
    handleCloseEditModal,
    handleCloseNewCategoryModal,
    handleOpenDeleteModal,
    handleOpenEditModal,
    handleOpenNewCategoryModal,
  } = useCategories();

  return (
    <>
      {categoryBeingEdited && (
        <EditCategoryModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          category={categoryBeingEdited}
        />
      )}

      {categoryBeignDeleted && (
        <DeleteCategoryModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          category={categoryBeignDeleted}
        />
      )}

      <NewCategoryModal
        open={openNewCategoryModal}
        onClose={handleCloseNewCategoryModal}
      />
      <Container>
        <Header>
          <div className="infos">
            <Title>Categorias</Title>
            <span>{categories.length}</span>
          </div>

          <button onClick={handleOpenNewCategoryModal}>
            Adicionar categoria
          </button>
        </Header>

        <Table.Container>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCollumn style={{ width: '5%' }}>
                Emoji
              </Table.HeaderCollumn>
              <Table.HeaderCollumn>Nome</Table.HeaderCollumn>
              <Table.HeaderCollumn style={{ width: '12%' }}>
                Ações
              </Table.HeaderCollumn>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {categories.map((category) => (
              <Table.Row key={category.id}>
                <Table.Cell style={{ textAlign: 'center' }}>
                  {category.icon}
                </Table.Cell>
                <Table.Cell>{capitalizeFirstLetter(category.name)}</Table.Cell>
                <Table.Cell style={{ display: 'flex', gap: '.4rem' }}>
                  <ActionButton onClick={() => handleOpenEditModal(category)}>
                    <Pencil />
                  </ActionButton>
                  <ActionButton onClick={() => handleOpenDeleteModal(category)}>
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
