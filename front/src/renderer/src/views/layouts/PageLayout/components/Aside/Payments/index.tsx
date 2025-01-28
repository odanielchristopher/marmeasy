import { Client } from '@renderer/app/entities/Client';
import { IoIosAdd } from 'react-icons/io';
import NewPaymentModal from './modals/NewPaymentModal';
import PaymentList from './PaymentList';
import { AddButton, Container, Header } from './styles';
import usePayments from './usePayments';

interface PaymentsProps {
  client: Client | null;
}

export default function Payments({ client }: PaymentsProps) {
  const payments = client?.payments;
  const {
    isOpenNewPaymentModal,
    handleOpenNewPaymentModal,
    handleCloseNewPaymentModal,
  } = usePayments();

  return (
    <>
      {isOpenNewPaymentModal && <NewPaymentModal open onClose={handleCloseNewPaymentModal}/>}

      <Container>
      <Header>
        <h3>Histórico de pagamentos</h3>

        <AddButton type="button" onClick={handleOpenNewPaymentModal}>
          <IoIosAdd size={32}/>
        </AddButton>
      </Header>

      {payments && <PaymentList payments={payments} />}
    </Container>
    </>
  );
}
