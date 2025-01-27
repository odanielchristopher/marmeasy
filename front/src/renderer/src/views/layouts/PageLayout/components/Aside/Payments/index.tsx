import { Client } from '@renderer/app/entities/Client';
import PaymentList from './PaymentList';
import { Container, EditIcon, Header } from './styles';

interface PaymentsProps {
  client: Client | null;
}

export default function Payments({ client }: PaymentsProps) {
  console.log({ client });

  const payments = client?.payments;

  return (
    <Container>
      <Header>
        <h3>Histórico de pagamentos</h3>

        <EditIcon size={28} />
      </Header>

      {payments && <PaymentList payments={payments} />}
    </Container>
  );
}
