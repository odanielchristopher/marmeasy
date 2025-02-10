import { Favorite } from '@renderer/app/services/dashboard/favoritesService/getAll';

import { CheckIcon } from '@renderer/assets/Icons/CheckIcon';
import { IngredientIcon } from '@renderer/assets/Icons/IngredientIcon';
import emptyImage from '@renderer/assets/Images/eating.svg';

import { Item } from '../../../components/Item';
import { Modal } from '../../../components/Modal';

import { EmptyImageContainer } from '../../../components/EmptyImageContainer';
import { Container } from './styles';

interface FavoritesModalProps {
  open: boolean;
  onClose(): void;
  favorites: { label: string; favorite: Favorite; isFirst: boolean }[];
}

export default function FavoritesModal({
  onClose,
  open,
  favorites,
}: FavoritesModalProps) {
  const hasFavorites = favorites.length > 0;

  return (
    <Modal.Root open={open} onClose={onClose} title="Favoritos">
      {!hasFavorites && (
        <EmptyImageContainer>
        <img src={emptyImage} alt="Sem favoritos nesse período" />
        <p>Não encontramos nenhum favorito durante esse período</p>
      </EmptyImageContainer>
      )}

      {favorites.map(({ label, favorite, isFirst }, index) => (
        <Container key={index}>
          <Item.Box $align="center">
            {isFirst && <CheckIcon color="#089F67" />}
            <Modal.Label text={label} type="secondary" />
          </Item.Box>

          <Item.Root>
            <Item.Box $align="center">
              <Item.Icon height={32}>
                <IngredientIcon size={32} />
              </Item.Icon>

              <Item.Box $direction="column" $gap={-7}>
                <Item.Title text={favorite.title} />
                <Item.Help
                  text={`${favorite.quantity} pedidos`}
                  $type="secondary"
                />
              </Item.Box>
            </Item.Box>
          </Item.Root>
        </Container>
      ))}
    </Modal.Root>
  );
}
