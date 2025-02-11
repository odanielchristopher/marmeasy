import { useFavoritesQuery } from '@renderer/app/hooks/queries/useFavoritesQuery';
import { CheckIcon } from '@renderer/assets/Icons/CheckIcon';
import Loader from '@renderer/views/components/Loader';
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

  const { favorites, isLoading } = useFavoritesQuery();

  const sortedFavorites = favorites.sort((a, b) =>
    a.quantity > b.quantity ? -1 : 1,
  );

  const favoritesToModal = favorites.map((favorite, index) => ({
    label: `${index + 1}° do cardápio`,
    favorite,
    isFirst: index === 0,
  }));

  return (
    <>
      {isOpenFavoritesModal && (
        <FavoritesModal
          open
          onClose={handleCloseFavoriteModal}
          favorites={favoritesToModal}
        />
      )}

      <Card.Root
        $justify="center"
        onClick={handleOpenFavoritesModal}
        disabled={isLoading}
      >
        {!isLoading && (
          <>
            <Card.Content $justify="start">
              <Card.Header>
                <Card.Icon color="success" height={28}>
                  <CheckIcon size={28} />
                </Card.Icon>
                <Card.Title text="1° do cardápio" type="secondary" />
              </Card.Header>
              <Card.Info
                text={sortedFavorites[0]?.title ?? 'Sem favoritos'}
                $align="center"
              />
            </Card.Content>
          </>
        )}

        {isLoading && <Loader size={24} $isLoading />}
      </Card.Root>
    </>
  );
}
