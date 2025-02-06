import { CheckIcon } from '@renderer/assets/Icons/CheckIcon';
import { IngredientIcon } from '@renderer/assets/Icons/IngredientIcon';
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
        <Item.Box $align="center">
          <CheckIcon color="#089F67" />
          <Modal.Label text="1° do cardápio" type="secondary" />
        </Item.Box>

        <Item.Root>
          <Item.Box $align="center">
            <Item.Icon height={32}>
              <IngredientIcon size={32} />
            </Item.Icon>

            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Strogonoff de Frango" />
              <Item.Help text="54 pedidos" $type="secondary" />
            </Item.Box>
          </Item.Box>
        </Item.Root>
      </Container>

      <Container>
        <Modal.Label text="2° do cardápio" type="terciary" />

        <Item.Root>
          <Item.Box $align="center">
            <Item.Icon height={32}>
              <IngredientIcon size={32} />
            </Item.Icon>

            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Calabresa" />
              <Item.Help text="38 pedidos" $type="secondary" />
            </Item.Box>
          </Item.Box>
        </Item.Root>
      </Container>

      <Container>
        <Modal.Label text="3° do cardápio" type="terciary" />

        <Item.Root>
          <Item.Box $align="center">
            <Item.Icon height={32}>
              <IngredientIcon size={32} />
            </Item.Icon>

            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Picadinho de carne" />
              <Item.Help text="26 pedidos" $type="secondary" />
            </Item.Box>
          </Item.Box>
        </Item.Root>
      </Container>
    </Modal.Root>
  );
}
