import { Order } from '@renderer/app/entities/Order';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import React from 'react';
import { Container } from './styles';
import useOrdersList from './useOrdersList';

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const { clientNameById } = useOrdersList();

  return (
    <>
      {orders.map((order) => {
        // Calcular a soma das quantidades de itens
        const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

        return (
          <Container key={order.id}>
            <div className="left">
              <h3>{clientNameById(order.clientId)}</h3>
              <p>Qtd: {totalQuantity}</p>
              {order.items.map((item) => (
                <div key={item.id}>
                  {/* Renderizar detalhes do item, se necessário */}
                </div>
              ))}
            </div>
            <div className="right">
              <p>{new Date(order.date).toLocaleDateString()}</p>
              <p>{formatCurrency(order.totalValue)}</p>
            </div>

            {/* <p>Desconto: {formatCurrency(order.discount)}</p> */}
            {/* //! isso vai para o aside <ul>
              {order.items.map((item) => (
                <li key={item.name}>
                  {item.quantity}x {item.name} - {formatCurrency(item.total)}
                </li>
              ))}
            </ul> */}
          </Container>
        );
      })}
    </>
  );
};

export default OrdersList;
