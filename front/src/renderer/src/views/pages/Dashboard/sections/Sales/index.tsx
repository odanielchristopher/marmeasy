import { HandCoinsIcon } from '@renderer/assets/Icons/HandCoinsIcon';
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

  return (
    <>
      {isOpenSalesModal && <SalesModal open onClose={handleCloseSalesModal} />}

      <Card.Root onClick={handleOpenSalesModal}>
        <Card.Content>
          <Card.Title text="Total de vendas" />
          <Card.Info text="54 vendas" />
        </Card.Content>
        <Card.Icon color="success" height={42}>
          <HandCoinsIcon size={42} />
        </Card.Icon>
      </Card.Root>
    </>
  );
}
