import { Client } from '@renderer/app/entities/Client';
import { IoIosAdd } from 'react-icons/io';
import PaymentList from './PaymentList';
import { AddButton, Container, Header } from './styles';

interface PaymentsProps {
  client: Client | null;
}

export default function Payments({ client }: PaymentsProps) {
  const payments = client?.payments;

  return (
    <Container>
      <Header>
        <h3>Histórico de pagamentos</h3>

        <AddButton type="button">
          <IoIosAdd size={32}/>
        </AddButton>
      </Header>

      {payments && <PaymentList payments={payments} />}
    </Container>
  );
}
