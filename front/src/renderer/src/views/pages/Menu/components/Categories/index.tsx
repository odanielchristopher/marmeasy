import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { productCategories } from '@renderer/app/mocks/productCategories';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import { Pencil } from '@renderer/assets/Icons/Pencil';
import { useCallback, useState } from 'react';
import { Table } from '../Table';
import DeleteCategoryModal from './DeleteCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import { ActionButton, Container, Header, Title } from './styles';

export default function Categories() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [categorySelected, setCategorySelected] = useState<ProductCategory | null>(null);

  const handleOpenEditModal = useCallback(() => {
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback((category: ProductCategory) => {
    setCategorySelected(category);
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  return (
    <>
      <EditCategoryModal open={openEditModal} onClose={handleCloseEditModal}/>
      <DeleteCategoryModal open={openDeleteModal} onClose={handleCloseDeleteModal} category={categorySelected}/>
      <Container>
        <Header>
          <div className="infos">
            <Title>Categorias</Title>
            <span>{productCategories.length}</span>
          </div>

          <button>Adicionar categoria</button>
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
                  <ActionButton onClick={handleOpenEditModal}>
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
