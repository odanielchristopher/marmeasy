import { useCallback, useState } from 'react';

import { useIncomesQuery } from '@renderer/app/hooks/queries/useIncomesQuery';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { IncomeIcon } from '@renderer/assets/Icons/IncomeIcon';
import Loader from '@renderer/views/components/Loader';

import IncomesModal from '../../components/IncomesModal';

import { Card } from '../../components/Card';

export default function Incomes() {
  const [isOpenIncomesModal, setIsOpenIncomesModal] = useState(false);

  const handleOpenIncomesModal = useCallback(() => {
    setIsOpenIncomesModal(true);
  }, []);

  const handleCloseIncomesModal = useCallback(() => {
    setIsOpenIncomesModal(false);
  }, []);

  const { incomes, isLoading } = useIncomesQuery();

  return (
    <>
      {isOpenIncomesModal && (
        <IncomesModal
          open
          onClose={handleCloseIncomesModal}
          incomesHistory={incomes.history}
        />
      )}

      <Card.Root onClick={handleOpenIncomesModal} disabled={isLoading}>
        {!isLoading && (
          <>
            <Card.Content>
              <Card.Title text="Entradas" />
              <Card.Info text={`R$ ${formatCurrency(incomes.total)}`} />
            </Card.Content>
            <Card.Icon color="success" height={42}>
              <IncomeIcon size={42} />
            </Card.Icon>
          </>
        )}

        {isLoading && <Loader size={24} $isLoading />}
      </Card.Root>
    </>
  );
}
