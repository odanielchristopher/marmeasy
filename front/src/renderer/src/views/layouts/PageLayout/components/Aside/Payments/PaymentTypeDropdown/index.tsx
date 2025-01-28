import { PaymentType } from '@renderer/app/entities/Payment';
import {
  paymentsTypeMapToIcon,
  paymentsTypeMapToView,
} from '@renderer/app/utils/mapers';
import { PaymentIcon } from '@renderer/assets/Icons/payments/PaymentIcon';
import { DropdownMenu } from '@renderer/views/components/DropdownMenu';
import { ArrowIcon, StyledItem, StyledList, TriggerButton } from './styles';

interface PaymentTypeDropdownProps {
  selectedPayment: PaymentType;
  onSelect(paymentType: PaymentType): void;
}

export default function PaymentTypeDropdown({
  selectedPayment,
  onSelect,
}: PaymentTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <TriggerButton>
          <PaymentIcon type={paymentsTypeMapToIcon[selectedPayment]} />
          <span>{paymentsTypeMapToView[selectedPayment]}</span>
          <ArrowIcon size={16} />
        </TriggerButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="start" asChild>
        <StyledList>
          <DropdownMenu.Item asChild onSelected={() => onSelect('DEBIT_CARD')}>
            <StyledItem $selected={selectedPayment === 'DEBIT_CARD'}>
              <PaymentIcon type="debitCard" />
              Débito
            </StyledItem>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild onSelected={() => onSelect('CREDIT_CARD')}>
            <StyledItem $selected={selectedPayment === 'CREDIT_CARD'}>
              <PaymentIcon type="creditCard" />
              Crédito
            </StyledItem>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild onSelected={() => onSelect('CASH')}>
            <StyledItem $selected={selectedPayment === 'CASH'}>
              <PaymentIcon type="cash" />
              Dinheiro
            </StyledItem>
          </DropdownMenu.Item>
        </StyledList>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
