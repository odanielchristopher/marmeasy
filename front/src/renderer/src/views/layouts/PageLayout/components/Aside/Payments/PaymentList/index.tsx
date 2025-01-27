import { Payment, PaymentType } from '@renderer/app/entities/Payment';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { formatDate } from '@renderer/app/utils/formatDate';

import { PaymentIcon, PaymentIconType } from '@renderer/assets/Icons/payments/PaymentIcon';

import { Container, PaymentContainer, PaymentInfosContainer } from './styles';

interface PaymentListProps {
  payments: Payment[];
}

const paymentsTypeMapToView = {
  CREDIT_CARD: 'Crédito',
  DEBIT_CARD: 'Débito',
  CASH: 'Dinheiro',
};

const paymentsTypeMapToIcon: Record<PaymentType, PaymentIconType> = {
  CREDIT_CARD: 'creditCard',
  DEBIT_CARD: 'debitCard',
  CASH: 'cash',
};

export default function PaymentList({ payments }: PaymentListProps) {
  return (
    <Container>
      {payments.map((payment) => (
        <PaymentContainer key={payment.id}>
          <PaymentIcon type={paymentsTypeMapToIcon[payment.type]} />

          <PaymentInfosContainer>
            <div>
              <strong>{paymentsTypeMapToView[payment.type]}</strong>

              <span>{formatDate(new Date(payment.date))}</span>
            </div>

            <strong>R$ {formatCurrency(payment.value)}</strong>
          </PaymentInfosContainer>
        </PaymentContainer>
      ))}
    </Container>
  );
}
