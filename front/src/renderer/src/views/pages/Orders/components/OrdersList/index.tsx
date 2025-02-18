import { Order } from '@renderer/app/entities/Order';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import React from 'react';

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>{order.clientId}</h3>
          <p>Data: {new Date(order.date).toLocaleDateString()}</p>
          <p>Valor Total: {formatCurrency(order.totalValue)}</p>
          <p>Desconto: {formatCurrency(order.discount)}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.name}>
                {item.quantity}x {item.name} - {formatCurrency(item.total)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
