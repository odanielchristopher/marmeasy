import { Controller } from 'react-hook-form';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';

import Edit from '@renderer/assets/Images/Edit.svg';
import noImage from '@renderer/assets/Images/empty-image.svg';
import Plus from '@renderer/assets/Images/Plus.svg';
import Trash from '@renderer/assets/Images/Trash.svg';

import Button from '@renderer/views/components/Button';
import DatePickerInput from '@renderer/views/components/DatePickerInput';
import { Input } from '@renderer/views/components/Input';
import Loader from '@renderer/views/components/Loader';
import Modal from '@renderer/views/components/Modal';
import NewItemModal from '@renderer/views/pages/Orders/components/Items/NewItemModal';

import DeleteItemModal from '../../Items/DeleteItemModal';
import EditItemModal from '../../Items/EditItemModal';
import useOrderModal from './useNewOrderModal';

import { Order } from '@renderer/app/entities/Order';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import emptyImage from '@renderer/assets/Images/eating.svg';
import { CgCloseO } from 'react-icons/cg';
import {
  BoxCategories,
  Container,
  EmptyImageContainer,
  ErrorMessage,
  IconCategory,
  Line,
  OrderItemsList,
  ProductList,
} from './styles';

interface OrderModalProps {
  isOpen: boolean;
  onClose(): void;
  order?: Order;
  handleHiddenOrderData?(): void;
}

export default function NewOrderModal({
  isOpen,
  onClose,
  order,
  handleHiddenOrderData,
}: OrderModalProps) {
  const {
    index,
    errors,
    control,
    product,
    isLoadingProducts,
    filteredProducts,
    isLoading,
    categories,
    isUpdating,
    hasProducts,
    isItemModalOpen,
    isOrderModalOpen,
    selectedCategory,
    isEditItemModalOpen,
    isDeleteItemModalOpen,
    isLoadingCategories,
    selectedProduct,
    orderDetails,
    setOrderDetails,
    handleCategorySelect,
    handleOpenItemModal,
    handleCloseItemModal,
    handleOpenEditItemModal,
    handleOpenDeleteItemModal,
    handleCloseEditItemModal,
    handleCloseDeleteItemModal,
    addProductToOrder,
    onSubmit,
    handleSubmit,
  } = useOrderModal(isOpen, onClose, order, handleHiddenOrderData);

  const allCategories = [
    { id: 'all', name: 'todos', icon: '🍽️' },
    ...categories,
  ];

  return (
    <>
      {!isItemModalOpen && (
        <Modal open={isOrderModalOpen} title="Novo pedido" onClose={onClose}>
          <Container>
            <Controller
              control={control}
              name="clientName"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Nome do cliente*"
                  maxLength={15}
                  $error={errors.clientName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="date"
              defaultValue={new Date()}
              render={({ field: { onChange, value } }) => (
                <DatePickerInput
                  onChange={onChange}
                  value={value}
                  placeholder="Data*"
                  $error={errors.date?.message}
                />
              )}
            />

            <BoxCategories>
              {isLoadingCategories ? (
                <Loader $isLoading={isLoadingCategories} size={20} />
              ) : (
                allCategories.map((category) => (
                  <IconCategory
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className={
                      selectedCategory?.id === category.id ||
                      (category.id === 'all' && !selectedCategory)
                        ? 'active'
                        : ''
                    }
                  >
                    <div className="circle">{category.icon}</div>
                    <p>{capitalizeFirstLetter(category.name)}</p>
                  </IconCategory>
                ))
              )}
            </BoxCategories>

            <ul className="productsOptions">
              {hasProducts &&
                filteredProducts.map((product) => {
                  const imagePath =
                    product.imagePath &&
                    `${import.meta.env.VITE_API_URL}/${product.imagePath}`;

                  return (
                    <ProductList key={product.id}>
                      {product.imagePath ? (
                        <img src={imagePath} />
                      ) : (
                        <img src={noImage} alt="Sem imagem" />
                      )}
                      <div className="infos">
                        <strong>{capitalizeFirstLetter(product.name)}</strong>
                        <span>{product.description}</span>
                        <div className="footer">
                          <strong>R$ {formatCurrency(product.price)}</strong>
                          <img
                            src={Plus}
                            alt="Adicionar"
                            onClick={() => handleOpenItemModal(product)}
                          />
                        </div>
                      </div>
                    </ProductList>
                  );
                })}

              {!hasProducts && !isLoadingProducts && (
                <EmptyImageContainer>
                  <img src={emptyImage} alt="Sem favoritos nesse período" />
                  <p>Não encontramos nenhum produto nessa categoria.</p>
                </EmptyImageContainer>
              )}
            </ul>

            <ErrorMessage>
              {errors.items ? (
                <CgCloseO color="#F63131" />
              ) : (
                <CgCloseO color="transparent" />
              )}
              {errors.items?.message}
            </ErrorMessage>

            {orderDetails.length > 0 && (
              <div className="orderDetails">
                <Line />
                {orderDetails.map((order, index) => {
                  const imagePath = order.productImage
                    ? `${import.meta.env.VITE_API_URL}/${order.productImage}`
                    : noImage;
                  // console.log(`${order.productName}-${index}`);
                  return (
                    <OrderItemsList key={`${order.productName}-${index}`}>
                      <img
                        className="smallImg"
                        src={imagePath}
                        alt={order.productName}
                      />
                      <div className="infoOrder">
                        <div className="nameDetails">
                          <p>
                            <strong>{order.productName}</strong>
                          </p>
                          {order.selectedIngredients.map(
                            (ingredient: Ingredient) => (
                              <span key={ingredient.id}>{ingredient.name}</span>
                            ),
                          )}
                        </div>
                        <div className="priceQuantity">
                          <p>
                            <strong>
                              R$ {formatCurrency(order.productPrice)}
                            </strong>
                          </p>
                          <span>{order.quantity}X</span>
                        </div>
                      </div>
                      <div className="functions">
                        <img
                          src={Edit}
                          alt="Editar"
                          onClick={() => handleOpenEditItemModal(index)}
                        />
                        <img
                          src={Trash}
                          alt="Deletar"
                          onClick={() => handleOpenDeleteItemModal(index)}
                        />
                      </div>
                    </OrderItemsList>
                  );
                })}
              </div>
            )}

            <Button
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading || isUpdating}
            >
              Fechar pedido
            </Button>
          </Container>
        </Modal>
      )}

      {isItemModalOpen && selectedProduct && (
        <NewItemModal
          open={isItemModalOpen}
          onClose={handleCloseItemModal}
          product={selectedProduct}
          title={
            selectedProduct.ingredients.length > 0
              ? 'Ingredientes e Quantidade'
              : 'Quantidade'
          }
          answer={
            selectedProduct.ingredients.length > 0
              ? 'Selecione os ingredientes desejados'
              : 'Deseja adicionar este produto ao pedido?'
          }
          onSubmit={addProductToOrder}
          hasIngredients={selectedProduct.ingredients.length > 0}
        />
      )}

      {isEditItemModalOpen && index !== null && product && (
        <EditItemModal
          open={isEditItemModalOpen}
          onClose={handleCloseEditItemModal}
          product={product}
          title="Editar Pedido"
          answer="Atualize as informações do pedido"
          index={index}
          order={orderDetails[index]}
          setOrderDetails={setOrderDetails}
          orderDetails={orderDetails}
          hasIngredients={product.ingredients.length > 0}
        />
      )}

      {isDeleteItemModalOpen && index !== null && (
        <DeleteItemModal
          open={isDeleteItemModalOpen}
          onClose={handleCloseDeleteItemModal}
          title="Deletar Item do Pedido"
          answer="Deseja deletar este item: "
          index={index}
          setOrderDetails={setOrderDetails}
          orderDetails={orderDetails}
        />
      )}
    </>
  );
}
