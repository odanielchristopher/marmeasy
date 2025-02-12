import { useCallback, useState } from 'react';

import { Income } from '@renderer/app/entities/Income';

import { formatCurrency } from '@renderer/app/utils/formatCurrency';

import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import { Item } from '../../../components/Item';

import { useIncomesByTypeQuery } from '@renderer/app/hooks/queries/useIncomesByTypeQuery';
import IncomesModal from '../../../components/IncomesModal';
import { SectionTitle } from '../styles';
import { Container } from './styles';

interface IncomesSectionProps {
  incomes: Income[];
}

export const translateIncomeType = {
  CREDIT_CARD: 'Crédito',
  DEBIT_CARD: 'Débito',
  CASH: 'Dinheiro',
};

export default function IncomesSection({ incomes }: IncomesSectionProps) {
  const [isOpenIncomeModal, setIsOpenIncomeModal] = useState(false);
  const [selectedIncomeType, setSelectedIncomeType] = useState<
    string | undefined
  >();

  const handleOpenIncomeModal = useCallback((income: Income) => {
    setSelectedIncomeType(income.type);
    setIsOpenIncomeModal(true);
  }, []);

  const handleCloseIncomeModal = useCallback(() => {
    setSelectedIncomeType(undefined);
    setIsOpenIncomeModal(false);
  }, []);

  const { incomes: selectedTypeIncomes, isLoading } = useIncomesByTypeQuery(
    isOpenIncomeModal,
    selectedIncomeType,
  );

  return (
    <Container>
      {isOpenIncomeModal && (
        <IncomesModal
          title={
            translateIncomeType[
              selectedIncomeType as keyof typeof translateIncomeType
            ]
          }
          isLoading={isLoading}
          onClose={handleCloseIncomeModal}
          incomesHistory={selectedTypeIncomes.history}
          open
        />
      )}

      <SectionTitle>Categorias de entradas</SectionTitle>

      <div>
        {incomes.map((income) => {
          const title = translateIncomeType[income.type];
          const icon = income.type === 'CASH' ? 'cash' : 'default';

          return (
            <Item.Root
              $hasAction
              key={income.id}
              onClick={() => handleOpenIncomeModal(income)}
            >
              <Item.Box $align="center">
                <Item.Icon height={28}>
                  <DashboardCategoryIcon type="income" icon={icon} size={28} />
                </Item.Icon>
                <Item.Box $direction="column" $gap={-7}>
                  <Item.Title text={title} />
                  <Item.Currency
                    text={`R$ ${formatCurrency(income.value)}`}
                    color="success"
                  />
                </Item.Box>
              </Item.Box>
            </Item.Root>
          );
        })}
      </div>
    </Container>
  );
}
