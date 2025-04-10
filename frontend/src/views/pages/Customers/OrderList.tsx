import { Order } from '@views/components/Order';

// 'INDIVIDUAL' | 'BUSINESS';

const orders = [
  {
    customer: {
      id: String(Math.random()),
      type: 'INDIVIDUAL',
      name: 'João',
    },
    date: '12/12/2005',
    quantity: 2,
    total: 42.5,
  },
  {
    customer: {
      id: String(Math.random()),
      type: 'BUSINESS',
      name: 'Oficina',
    },
    date: '12/12/2005',
    quantity: 6,
    total: 122.3,
  },
  {
    customer: {
      id: String(Math.random()),
      type: 'INDIVIDUAL',
      name: 'Ellen',
    },
    date: '12/12/2005',
    quantity: 1,
    total: 12,
  },
];

export function OrderList() {
  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <Order order={order} key={order.customer.id} />
      ))}
    </ul>
  );
}
