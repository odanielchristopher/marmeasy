import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import { Pencil } from '@renderer/assets/Icons/Pencil';
import { Table } from '@renderer/views/components/Table';

import DeleteProductModal from './modals/DeleteProductModal';
import EditProductModal from './modals/EditProductModal';
import NewProductModal from './modals/NewProductModal';

import emptyCart from '@renderer/assets/Images/empty-cart.svg';
import noImage from '@renderer/assets/Images/empty-image.svg';

import useProducts from './useProducts';

import Loader from '@renderer/views/components/Loader';
import { EmptyImageContainer } from '../../styles';
import {
  ActionButton,
  CategoryContainer,
  Container,
  Header,
  LoaderContainer,
  ProductImage,
  Title,
} from './styles';

export default function Products() {
  const {
    products,
    isLoading,
    hasProducts,
    productBeingDeleted,
    productBeingEdited,
    openEditModal,
    openDeleteModal,
    openNewProductModal,
    handleOpenEditModal,
    handleOpenDeleteModal,
    handleOpenNewProductModal,
    handleCloseEditModal,
    handleCloseDeleteModal,
    handleCloseNewProductModal,
  } = useProducts();

  return (
    <>
      {openNewProductModal && (
        <NewProductModal
          open={openNewProductModal}
          onClose={handleCloseNewProductModal}
        />
      )}

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

          <button onClick={handleOpenNewProductModal}>Adicionar produto</button>
        </Header>

        <Table.Container>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCollumn>Imagem</Table.HeaderCollumn>
              <Table.HeaderCollumn>Nome</Table.HeaderCollumn>
              <Table.HeaderCollumn>Categoria</Table.HeaderCollumn>
              <Table.HeaderCollumn>Preço</Table.HeaderCollumn>
              <Table.HeaderCollumn style={{ width: '12%' }}>
                Ações
              </Table.HeaderCollumn>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products.map((product) => {
              const imagePath =
                product.imagePath &&
                `${import.meta.env.VITE_API_URL}/${product.imagePath}`;

              return (
                <Table.Row key={product.id}>
                  <Table.Cell style={{ width: '20%' }}>
                    <ProductImage
                      src={imagePath || noImage}
                      alt={product.description}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ width: '20%' }}>
                    {capitalizeFirstLetter(product.name)}
                  </Table.Cell>
                  <Table.Cell style={{ width: '20%' }}>
                    <CategoryContainer>
                      {product.category && (
                        <>
                          <span>{product.category.icon}</span>
                          <span>
                            {capitalizeFirstLetter(product.category.name)}
                          </span>
                        </>
                      )}

                      {!product.category && <span>Nenhuma</span>}
                    </CategoryContainer>
                  </Table.Cell>
                  <Table.Cell style={{ width: '20%' }}>
                    R$ {formatCurrency(product.price)}
                  </Table.Cell>
                  <Table.Cell style={{ display: 'flex', gap: '.4rem' }}>
                    <ActionButton onClick={() => handleOpenEditModal(product)}>
                      <Pencil />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleOpenDeleteModal(product)}
                    >
                      <DeleteIcon />
                    </ActionButton>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Container>

        {!hasProducts && !isLoading && (
          <EmptyImageContainer>
            <img src={emptyCart} alt="Sem produtos" />
            <span>Sem produtos cadastros</span>
          </EmptyImageContainer>
        )}

        {isLoading && (
          <LoaderContainer>
            <Loader $isLoading size={32} />
          </LoaderContainer>
        )}
      </Container>
    </>
  );
}
