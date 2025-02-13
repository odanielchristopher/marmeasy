import { Order } from '@renderer/app/entities/Order';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import React from 'react';
import { Container } from './styles';
import useOrdersList from './useOrdersList';

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const { clientNameById, clientTypeById, handleOrderClick, selectedOrderId } = useOrdersList();

  return (
    <>
      {orders.map((order) => {
        const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
        return (
          <Container key={order.id} onClick={() => handleOrderClick(order.id)} className={selectedOrderId === order.id ? 'selected' : ''}>
            <div className="left">
              <div className="clientsInfo">
                <strong>{clientNameById(order.clientId)}</strong>
                {clientTypeById(order.clientId) && <span>{clientTypeById(order.clientId)}</span>}
              </div>
              <span>Quantidade: {totalQuantity}</span>
            </div>
            <div className="right">
              <span>{new Date(order.date).toLocaleDateString()}</span>
              <span>R$: {formatCurrency(order.totalValue)}</span>
            </div>
          </Container>
        );
      })}
    </>
  );
};

export default OrdersList;
