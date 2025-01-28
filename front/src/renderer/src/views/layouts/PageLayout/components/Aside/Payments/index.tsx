import { Client } from '@renderer/app/entities/Client';
import Loader from '@renderer/views/components/Loader';
import { IoIosAdd } from 'react-icons/io';
import NewPaymentModal from './modals/NewPaymentModal';
import PaymentList from './PaymentList';
import { AddButton, Container, EmptyContainer, Header } from './styles';
import usePayments from './usePayments';

import addNotes from '@renderer/assets/Images/add-notes.svg';
import EditPaymentModal from './modals/EditPaymentModal';

interface PaymentsProps {
  client: Client | null;
}

export default function Payments({ client }: PaymentsProps) {
  const {
    payments,
    hasPayments,
    isLoading,
    selectedPayment,
    handleSelectedPayment,
    isOpenNewPaymentModal,
    isOpenEditPaymentModal,
    handleOpenNewPaymentModal,
    handleCloseNewPaymentModal,
    handleCloseEditPaymentModal,
  } = usePayments(client);

  return (
    <>
      {isOpenNewPaymentModal && (
        <NewPaymentModal
          open={isOpenNewPaymentModal}
          onClose={handleCloseNewPaymentModal}
          client={client}
        />
      )}
      {isOpenEditPaymentModal && (
        <EditPaymentModal
          open={isOpenEditPaymentModal}
          onClose={handleCloseEditPaymentModal}
          payment={selectedPayment}
          client={client}
        />
      )}

      <Container>
        <Header>
          <h3>Histórico de pagamentos</h3>

          <AddButton type="button" onClick={handleOpenNewPaymentModal}>
            <IoIosAdd size={32} />
          </AddButton>
        </Header>

        {isLoading && (
          <div className="payments-loader">
            <Loader $isLoading size={24} />
          </div>
        )}

        {!hasPayments && !isLoading && (
          <EmptyContainer>
            <img src={addNotes} alt="Sem pagamnetos" />
            <span>Não encontramos nenhum registro de pagamento.</span>
          </EmptyContainer>
        )}

        {payments && (
          <PaymentList payments={payments} onSelect={handleSelectedPayment} />
        )}
      </Container>
    </>
  );
}
