import { formatCurrency } from '@renderer/app/utils/formatCurrency';

import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import { Item } from '../Item';
import { Modal } from '../Modal';

import { Income } from '@renderer/app/entities/Income';
import { History } from '@renderer/app/services/types';

import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { formatMonthYear } from '@renderer/app/utils/formatMonthYear';

import { formatDay } from '@renderer/app/utils/formatDay';
import { translateIncomeType } from '../../sections/CategoriesSection/IncomesSection';

import emptyImage from '@renderer/assets/Images/empty-box.svg';

import { EmptyImageContainer } from '../EmptyImageContainer';

import Loader from '@renderer/views/components/Loader';
import { LoaderContainer } from '../LoaderContainer';
import { ListPerDate } from './styles';

interface IncomesModalProps {
  open: boolean;
  title?: string;
  isLoading?: boolean;
  incomesHistory: History<Income>[];
  onClose(): void;
}

export default function IncomesModal({
  open,
  title,
  isLoading,
  incomesHistory,
  onClose,
}: IncomesModalProps) {
  const hasIncomes = Object.entries(incomesHistory).length > 0;

  return (
    <Modal.Root open={open} onClose={onClose} title={title ?? 'Entradas'}>
      {isLoading && (
        <LoaderContainer>
          <Loader $isLoading size={24} />
        </LoaderContainer>
      )}

      {!hasIncomes && !isLoading && (
        <EmptyImageContainer>
          <img src={emptyImage} alt="Sem entradas nesse período" />
          <p>Não encontramos nenhuma entrada nesse período</p>
        </EmptyImageContainer>
      )}

      {hasIncomes &&
        !isLoading &&
        incomesHistory.map(({ monthYear, days }) => (
          <ListPerDate key={monthYear}>
            <Modal.Label
              text={capitalizeFirstLetter(formatMonthYear(monthYear))}
            />

            {days.map(({ day, items: incomes }, index) => (
              <div key={index}>
                <Modal.Description
                  text={capitalizeFirstLetter(formatDay(day, monthYear))}
                />

                {incomes.map((income, index) => (
                  <Item.Root key={index}>
                    <Item.Box $align="center">
                      <Item.Icon height={32}>
                        <DashboardCategoryIcon
                          type="income"
                          icon={income.type === 'CASH' ? 'cash' : 'default'}
                          size={32}
                        />
                      </Item.Icon>

                      <Item.Box $direction="column" $gap={-7}>
                        <Item.Title
                          text={capitalizeFirstLetter(income.clientName)}
                        />
                        <Item.Help
                          text={translateIncomeType[income.type]}
                          $type="secondary"
                        />
                      </Item.Box>
                    </Item.Box>

                    <Item.Currency
                      text={`R$ ${formatCurrency(income.value)}`}
                      color="success"
                    />
                  </Item.Root>
                ))}
              </div>
            ))}
          </ListPerDate>
        ))}
    </Modal.Root>
  );
}
