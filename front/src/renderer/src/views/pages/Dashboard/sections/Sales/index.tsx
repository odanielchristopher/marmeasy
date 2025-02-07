import { useSalesQuery } from '@renderer/app/hooks/queries/useSalesQuery';
import { HandCoinsIcon } from '@renderer/assets/Icons/HandCoinsIcon';
import Loader from '@renderer/views/components/Loader';
import { useCallback, useState } from 'react';
import { Card } from '../../components/Card';
import SalesModal from './SalesModal';

export default function Sales() {
  const [isOpenSalesModal, setIsOpenSalesModal] = useState(false);

  const handleOpenSalesModal = useCallback(() => {
    setIsOpenSalesModal(true);
  }, []);

  const handleCloseSalesModal = useCallback(() => {
    setIsOpenSalesModal(false);
  }, []);

  const { sales, isLoading } = useSalesQuery();

  return (
    <>
      {isOpenSalesModal && (
        <SalesModal
          open
          onClose={handleCloseSalesModal}
          salesHistory={sales.history}
        />
      )}

      <Card.Root onClick={handleOpenSalesModal} disabled={isLoading}>
        {!isLoading && (
          <>
            <Card.Content>
              <Card.Title text="Total de vendas" />
              <Card.Info text={`${sales.total} vendas`} />
            </Card.Content>
            <Card.Icon color="success" height={42}>
              <HandCoinsIcon size={42} />
            </Card.Icon>
          </>
        )}

        {isLoading && <Loader size={24} $isLoading />}
      </Card.Root>
    </>
  );
}
