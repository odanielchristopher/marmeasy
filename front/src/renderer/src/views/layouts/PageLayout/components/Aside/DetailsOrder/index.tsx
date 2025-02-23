import { Order } from '@renderer/app/entities/Order';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import edit from '@renderer/assets/Images/Edit.svg';
import { useState } from 'react';
import NewOrderModal from '../../../../../pages/Orders/components/Orders/NewOrderModal';
import DeleteOrderModal from '../DetailsOrder/Modals/DeleteOrderModal/index'; // Importe o modal de confirmação
import { ButtonDelete, Container, ItemBox, Line } from './styles';
import useDetailsOrder from './useDetailsOrder';

interface DetailsOrderProps {
  order: Order | null;
  handleHiddenOrderData(): void;
}

export default function DetailsOrder({
  order,
  handleHiddenOrderData,
}: DetailsOrderProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para controlar o modal de confirmação
  const {
    isEditOrderModalOpen,
    orderDetails,
    handleEditOrder,
    handleCloseEditOrderModal,
  } = useDetailsOrder();

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Container>
      <header>
        <p>Detalhes do pedido</p>
        <img
          src={edit}
          alt="Edit"
          onClick={() => order && handleEditOrder(order)}
        />
      </header>
      {order?.items.map((item) => {
        return (
          <ItemBox key={item.id}>
            <div className="right">
              <div className="top">
                <strong>{item.name}</strong>
                <strong>R$ {formatCurrency(item.total)}</strong>
              </div>
              <div className="bottom">
                <div className="ingredients">
                  {item.ingredients.map((ingrediente, index) => {
                    return <p key={index}>{ingrediente}</p>;
                  })}
                </div>
                <p>{item.quantity}x</p>
              </div>
            </div>
          </ItemBox>
        );
      })}
      <Line />
      <footer>
        <div className="left-footer">
          <span>Itens({order?.items.length})</span>
          <span>Taxa de entrega</span>
          <span>Desconto</span>
          <span>Valor total</span>
        </div>
        <div className="right-footer">
          <strong>R$ {formatCurrency(order?.totalValue || 0)}</strong>
          <strong>R$ {formatCurrency(0)}</strong>
          <strong>R$ {formatCurrency(0)}</strong>
          <strong>R$ {formatCurrency(order?.totalValue || 0)}</strong>
        </div>
      </footer>

      <ButtonDelete onClick={handleOpenDeleteModal}>
        <strong>Deletar Pedido</strong>
      </ButtonDelete>

      {isEditOrderModalOpen && orderDetails && (
        <NewOrderModal
          isOpen={isEditOrderModalOpen}
          onClose={handleCloseEditOrderModal}
          order={orderDetails}
          handleHiddenOrderData={handleHiddenOrderData}
        />
      )}

      {isDeleteModalOpen && order && (
        <DeleteOrderModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          order={order}
          handleHiddenOrderData={handleHiddenOrderData}
        />
      )}
    </Container>
  );
}
