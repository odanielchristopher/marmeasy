import { OrdersIcon } from '@renderer/assets/Icons/OrdersIcon';
import { SectionHeader } from '@renderer/views/components/SectionHeader';
import { Container } from './styles';

export default function Orders() {
  return (
    <Container>
      <SectionHeader>
        <div>
          <OrdersIcon />
          <h1>Pedidos</h1>
        </div>
        <p>Gerencie os pedidos dos seus clientes.</p>
      </SectionHeader>
    </Container>
  );
}
