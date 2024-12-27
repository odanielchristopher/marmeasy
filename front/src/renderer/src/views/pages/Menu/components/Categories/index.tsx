import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { productCategories } from '@renderer/app/mocks/productCategories';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import { Pencil } from '@renderer/assets/Icons/Pencil';
import { useCallback, useState } from 'react';
import { Table } from '../Table';
import DeleteCategoryModal from './DeleteCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import NewCategoryModal from './NewCategoryModal';
import { ActionButton, Container, Header, Title } from './styles';

export default function Categories() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openNewCategoryModal, setOpenNewCategoryModal] = useState(false);

  const [categorySelected, setCategorySelected] = useState<ProductCategory | null>(null);

  const handleOpenEditModal = useCallback((category: ProductCategory) => {
    setCategorySelected(category);
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setCategorySelected(null);
    setOpenEditModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback((category: ProductCategory) => {
    setCategorySelected(category);
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setCategorySelected(null);
    setOpenDeleteModal(false);
  }, []);

  const handleOpenNewCategoryModal = useCallback(() => {
    setOpenNewCategoryModal(true);
  }, []);

  const handleCloseNewCategoryModal = useCallback(() => {
    setOpenNewCategoryModal(false);
  }, []);

  return (
    <>
      {categorySelected && (
        <EditCategoryModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          category={categorySelected}
        />
      )}

      {categorySelected && (
        <DeleteCategoryModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          category={categorySelected}
        />
      )}

      <NewCategoryModal open={openNewCategoryModal} onClose={handleCloseNewCategoryModal} />
      <Container>
        <Header>
          <div className="infos">
            <Title>Categorias</Title>
            <span>{productCategories.length}</span>
          </div>

          <button onClick={handleOpenNewCategoryModal}>Adicionar categoria</button>
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
            {productCategories.map((category) => (
              <Table.Row key={category.id}>
                <Table.Cell style={{ textAlign: 'center' }}>{category.icon}</Table.Cell>
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
      </Container>
    </>
  );
}
