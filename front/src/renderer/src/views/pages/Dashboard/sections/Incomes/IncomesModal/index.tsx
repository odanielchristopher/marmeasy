import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import { Item } from '../../../components/Item';
import { Modal } from '../../../components/Modal';
import { Container } from './styles';

interface IncomesModalProps {
  open: boolean;
  onClose(): void;
}

export default function IncomesModal({ onClose, open }: IncomesModalProps) {
  return (
    <Modal.Root open={open} onClose={onClose} title="Entradas">
      <Container>
        <Modal.Label text="Janeiro, 2025" />
        <Modal.Description text="Sexta, 31 jan. 2025" />

        <Item.Root>
          <Item.Box $align="center">
            <Item.Icon height={32}>
              <DashboardCategoryIcon type="income" icon="default" size={32} />
            </Item.Icon>

            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Plataforma" />
              <Item.Help text="Crédito" $type="secondary" />
            </Item.Box>
          </Item.Box>

          <Item.Currency
            text={`R$ ${formatCurrency(120.58)}`}
            color="success"
          />
        </Item.Root>

        <Item.Root>
          <Item.Box $align="center">
            <Item.Icon height={32}>
              <DashboardCategoryIcon type="income" icon="cash" size={32} />
            </Item.Icon>

            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="João" />
              <Item.Help text="Débito" $type="secondary" />
            </Item.Box>
          </Item.Box>

          <Item.Currency
            text={`R$ ${formatCurrency(120.58)}`}
            color="success"
          />
        </Item.Root>
      </Container>
    </Modal.Root>
  );
}
