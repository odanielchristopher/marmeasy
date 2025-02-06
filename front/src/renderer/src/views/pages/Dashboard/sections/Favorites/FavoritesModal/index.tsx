import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { HandCoinsIcon } from '@renderer/assets/Icons/HandCoinsIcon';
import { Item } from '../../../components/Item';
import { Modal } from '../../../components/Modal';
import { Container } from './styles';

interface FavoritesModalProps {
  open: boolean;
  onClose(): void;
}

export default function FavoritesModal({ onClose, open }: FavoritesModalProps) {
  return (
    <Modal.Root open={open} onClose={onClose} title="Favoritos">
      <Container>
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
