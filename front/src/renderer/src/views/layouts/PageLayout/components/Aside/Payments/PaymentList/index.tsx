import { Payment } from '@renderer/app/entities/Payment';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { formatDate } from '@renderer/app/utils/formatDate';
import {
  paymentsTypeMapToIcon,
  paymentsTypeMapToView,
} from '@renderer/app/utils/mapers';

import { PaymentIcon } from '@renderer/assets/Icons/payments/PaymentIcon';

import { Container, PaymentContainer, PaymentInfosContainer } from './styles';

interface PaymentListProps {
  payments: Payment[];
  onSelect(payment: Payment): void;
}

export default function PaymentList({ payments, onSelect }: PaymentListProps) {
  return (
    <>
      <Container>
        {payments.map((payment) => (
          <PaymentContainer
            key={payment.id}
            onClick={() => onSelect(payment)}
          >
            <PaymentIcon type={paymentsTypeMapToIcon[payment.type]} />

            <PaymentInfosContainer>
              <div className="left">
                <strong>{paymentsTypeMapToView[payment.type]}</strong>

                <span>{formatDate(new Date(payment.date))}</span>
              </div>

              <strong className="value">
                R$ {formatCurrency(payment.value)}
              </strong>
            </PaymentInfosContainer>
          </PaymentContainer>
        ))}
      </Container>
    </>
  );
}
