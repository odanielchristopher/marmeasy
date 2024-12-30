import { products } from '@renderer/app/mocks/products';
import { Table } from '../Table';

import { Product } from '@renderer/app/entities/Product';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import { Pencil } from '@renderer/assets/Icons/Pencil';
import { useCallback, useState } from 'react';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';
import { ActionButton, CategoryContainer, Container, Header, ProductImage, Title } from './styles';

export default function Produtos() {
  const [openEditModal, setOpenEditModal] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [productBeingDeleted, setProductBeingDeleted] = useState<Product | null>(null);
  const [productBeingEdited, setproductBeingEdited] = useState<Product | null>(null);

  const handleOpenEditModal = useCallback((product: Product) => {
    setproductBeingEdited(product);
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setproductBeingEdited(null);
    setOpenEditModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback((product: Product) => {
    setProductBeingDeleted(product);
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setproductBeingEdited(null);
    setOpenDeleteModal(false);
  }, []);

  return (
    <>
      {productBeingEdited && (
        <EditProductModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          product={productBeingEdited}
        />
      )}

      {productBeingDeleted && (
        <DeleteProductModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          product={productBeingDeleted}
        />
      )}

      <Container>
        <Header>
          <div className="infos">
            <Title>Produtos</Title>
            <span>{products.length}</span>
          </div>

          <button>Adicionar produto</button>
        </Header>

        <Table.Container>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCollumn>Imagem</Table.HeaderCollumn>
              <Table.HeaderCollumn>Nome</Table.HeaderCollumn>
              <Table.HeaderCollumn>Categoria</Table.HeaderCollumn>
              <Table.HeaderCollumn>Preço</Table.HeaderCollumn>
              <Table.HeaderCollumn style={{ width: '12%' }}>Ações</Table.HeaderCollumn>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell style={{ width: '20%' }}>
                  <ProductImage
                    src={`${import.meta.env.VITE_API_URL}/${product.imagePath}`}
                    alt={product.description}
                  />
                </Table.Cell>
                <Table.Cell style={{ width: '20%' }}>
                  {capitalizeFirstLetter(product.name)}
                </Table.Cell>
                <Table.Cell style={{ width: '20%' }}>
                  <CategoryContainer>
                    <span>{product.category.icon}</span>
                    <span>{capitalizeFirstLetter(product.category.name)}</span>
                  </CategoryContainer>
                </Table.Cell>
                <Table.Cell style={{ width: '20%' }}>R$ {formatCurrency(product.price)}</Table.Cell>
                <Table.Cell style={{ display: 'flex', gap: '.4rem' }}>
                  <ActionButton onClick={() => handleOpenEditModal(product)}>
                    <Pencil />
                  </ActionButton>
                  <ActionButton onClick={() => handleOpenDeleteModal(product)}>
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
