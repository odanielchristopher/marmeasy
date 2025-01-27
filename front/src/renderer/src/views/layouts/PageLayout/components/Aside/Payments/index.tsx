import { Client } from '@renderer/app/entities/Client';
import { Container, EditIcon, Header, PaymentContainer, PaymentList } from './styles';

interface PaymentsProps {
  client: Client | null;
}

export default function Payments({ client }: PaymentsProps) {
  console.log({ client });

  return (
    <Container>
      <Header>
        <h3>Histórico de pagamentos</h3>

        <EditIcon size={28} />
      </Header>

      <PaymentList>
        <PaymentContainer>

        </PaymentContainer>
      </PaymentList>
    </Container>
  );
}
