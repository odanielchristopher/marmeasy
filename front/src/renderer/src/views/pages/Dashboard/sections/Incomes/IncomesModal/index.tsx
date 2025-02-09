import { formatCurrency } from '@renderer/app/utils/formatCurrency';

import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import { Item } from '../../../components/Item';
import { Modal } from '../../../components/Modal';

import { Income } from '@renderer/app/entities/Income';
import { History } from '@renderer/app/services/types';

import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { formatMonthYear } from '@renderer/app/utils/formatMonthYear';

import { formatDay } from '@renderer/app/utils/formatDay';
import { translateIncomeType } from '../../CategoriesSection/IncomesSection';
import { ListPerDate } from './styles';
interface IncomesModalProps {
  open: boolean;
  onClose(): void;
  incomesHistory: History<Income>;
}

export default function IncomesModal({
  onClose,
  open,
  incomesHistory,
}: IncomesModalProps) {
  return (
    <Modal.Root open={open} onClose={onClose} title="Entradas">
      {Object.entries(incomesHistory).map(([monthYear, days]) => (
        <ListPerDate key={monthYear}>
          <Modal.Label
            text={capitalizeFirstLetter(formatMonthYear(monthYear))}
          />

          {Object.entries(days).map(([day, incomes], index) => (
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
