import { Order } from '@renderer/app/entities/Order';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import React from 'react';
import { Container } from './styles';
import useOrdersList from './useOrdersList';

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const { findClient, handleOrderClick, selectedOrderId, handleShowOrderData } = useOrdersList();

  const handleSelectOrder = (order: Order) => {
    handleOrderClick(order.id);
    handleShowOrderData(order);
  };


  return (
    <>
      {orders.map((order) => {
        const valor = order?.items.reduce((sum, item) => sum + item.total, 0);
        if(order)
          order.totalValue = valor || 0;
        const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
        return (
          <Container key={order.id} onClick={() => handleSelectOrder(order)} className={selectedOrderId === order.id ? 'selected' : ''}>
            <div className="left">
              <div className="clientsInfo">
                <strong>{findClient(order.clientId)?.name}</strong>
                <span>{findClient(order.clientId)?.type}</span>
              </div>
              <span>Quantidade: {totalQuantity}</span>
            </div>
            <div className="right">
              <span>{new Date(order.date).toLocaleDateString()}</span>
              <span>R$ {formatCurrency(order.totalValue)}</span>
            </div>
          </Container>
        );
      })}
    </>
  );
};

export default OrdersList;
