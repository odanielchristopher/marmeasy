import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { IncomeIcon } from '@renderer/assets/Icons/IncomeIcon';
import { useCallback, useState } from 'react';
import { Card } from '../../components/Card';
import IncomesModal from './IncomesModal';

export default function Incomes() {
  const [isOpenIncomesModal, setIsOpenIncomesModal] = useState(false);

  const handleOpenIncomesModal = useCallback(() => {
    setIsOpenIncomesModal(true);
  }, []);

  const handleCloseIncomesModal = useCallback(() => {
    setIsOpenIncomesModal(false);
  }, []);

  return (
    <>
      {isOpenIncomesModal && (
        <IncomesModal open onClose={handleCloseIncomesModal} />
      )}
      <Card.Root onClick={handleOpenIncomesModal}>
        <Card.Content>
          <Card.Title text="Entradas" />
          <Card.Info text={`R$ ${formatCurrency(2321)}`} />
        </Card.Content>
        <Card.Icon color="success" height={42}>
          <IncomeIcon size={42} />
        </Card.Icon>
      </Card.Root>
    </>
  );
}
