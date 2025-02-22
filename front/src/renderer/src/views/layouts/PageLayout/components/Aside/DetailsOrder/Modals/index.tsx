import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Order } from '@renderer/app/entities/Order';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import noImage from '@renderer/assets/Images/empty-image.svg';
import Plus from '@renderer/assets/Images/Plus.svg';
import Trash from '@renderer/assets/Images/Trash.svg';
import Button from '@renderer/views/components/Button';
import DatePickerInput from '@renderer/views/components/DatePickerInput';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';
import { Controller } from 'react-hook-form';
import DeleteItemModal from '../../../../../../pages/Orders/components/Items/DeleteItemModal';
import EditItemModal from '../../../../../../pages/Orders/components/Items/EditItemModal';
import {
  Container,
  Line,
  OrderItemsList,
} from '../../../../../../pages/Orders/components/Orders/NewOrderModal/styles';
import useEditOrderModal from './useEditOrderModal';

interface EditOrderModalProps {
  isOpen: boolean;
  onClose(): void;
  order: Order;
}

export default function EditOrderModal({ isOpen, onClose, order }: EditOrderModalProps) {
  const {
    control,
    errors,
    handleSubmit,
    isLoading,
    isItemModalOpen,
    isEditItemModalOpen,
    isDeleteItemModalOpen,
    selectedProduct,
    setOrderDetails,
    handleOpenItemModal,
    handleCloseItemModal,
    handleOpenEditItemModal,
    handleOpenDeleteItemModal,
    handleCloseEditItemModal,
    handleCloseDeleteItemModal,
    addProductToOrder,
    orderDetails,
    index,
    onSubmit,
  } = useEditOrderModal(isOpen, onClose);

  return (
    <>
      {!isItemModalOpen && (
        <Modal open={isOpen} title="Editar Pedido" onClose={onClose}>
          <Container>
            <Controller
              control={control}
              name="clientName"
              render={({ field }) => (
                <Input
                  {...field}
                  value={order.clientId}
                  type="text"
                  placeholder="Nome do cliente"
                  maxLength={15}
                  $error={errors.clientName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="date"
              render={({ field: { onChange } }) => (
                <DatePickerInput
                  onChange={onChange}
                  value={new Date(order.date)}
                  placeholder="Data*"
                  $error={errors.date?.message}
                />
              )}
            />

            <div className="orderDetails">
              <Line />
              {orderDetails.map((order, index) => {
                const imagePath = order.productImage
                  ? `${import.meta.env.VITE_API_URL}/${order.productImage}`
                  : noImage;
                return (
                  <OrderItemsList key={index}>
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
                        src={Plus}
                        alt="Adicionar"
                        onClick={() => handleOpenItemModal(order)}
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

            <Button
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              Atualizar Pedido
            </Button>
          </Container>
        </Modal>
      )}

      {isItemModalOpen && selectedProduct && (
        <EditItemModal
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

      {isEditItemModalOpen && index !== null && (
        <EditItemModal
          open={isEditItemModalOpen}
          onClose={handleCloseEditItemModal}
          product={orderDetails[index]}
          title="Editar Pedido"
          answer="Atualize as informações do pedido"
          index={index}
          order={orderDetails[index]}
          setOrderDetails={setOrderDetails}
          orderDetails={orderDetails}
          hasIngredients={orderDetails[index].ingredients.length > 0}
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
