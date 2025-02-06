import { CheckIcon } from '@renderer/assets/Icons/CheckIcon';
import { useCallback, useState } from 'react';
import { Card } from '../../components/Card';
import FavoritesModal from './FavoritesModal';

export default function Favorites() {
  const [isOpenFavoritesModal, setIsOpenFavoritesModal] = useState(false);

  const handleOpenFavoritesModal = useCallback(() => {
    setIsOpenFavoritesModal(true);
  }, []);

  const handleCloseFavoriteModal = useCallback(() => {
    setIsOpenFavoritesModal(false);
  }, []);

  return (
    <>
      {isOpenFavoritesModal && (
        <FavoritesModal open onClose={handleCloseFavoriteModal} />
      )}

      <Card.Root $justify="center" onClick={handleOpenFavoritesModal}>
        <Card.Content>
          <Card.Header>
            <Card.Icon color="success" height={28}>
              <CheckIcon size={28} />
            </Card.Icon>
            <Card.Title text="1° do cardápio" type="secondary" />
          </Card.Header>
          <Card.Info text="Strogonoff de Frango" />
        </Card.Content>
      </Card.Root>
    </>
  );
}
