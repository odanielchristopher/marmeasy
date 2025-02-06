import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { HandCoinsIcon } from '@renderer/assets/Icons/HandCoinsIcon';
import { Item } from '../../../components/Item';
import { Modal } from '../../../components/Modal';
import { Container } from './styles';

interface SalesModalProps {
  open: boolean;
  onClose(): void;
}

export default function SalesModal({ onClose, open }: SalesModalProps) {
  return (
    <Modal.Root open={open} onClose={onClose} title="Vendas">
      <Container>
        <Modal.Label text="Janeiro, 2025" />
        <Modal.Description text="Sexta, 31 jan. 2025" />

        <Item.Root>
          <Item.Box $align="center">
            <Item.Icon>
              <HandCoinsIcon size={32} />
            </Item.Icon>

            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Plataforma" />
              <Item.Help text="3 pedidos" $type="secondary" />
            </Item.Box>
          </Item.Box>

          <Item.Currency
            text={`R$ ${formatCurrency(120.58)}`}
            color="success"
          />
        </Item.Root>
        <Item.Root>
          <Item.Box $align="center">
            <Item.Icon>
              <HandCoinsIcon size={32} />
            </Item.Icon>

            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Plataforma" />
              <Item.Help text="3 pedidos" $type="secondary" />
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
