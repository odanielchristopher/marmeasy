import { Sale } from '@renderer/app/entities/Sale';
import { History } from '@renderer/app/services/types';

import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { formatDay } from '@renderer/app/utils/formatDay';
import { formatMonthYear } from '@renderer/app/utils/formatMonthYear';

import { HandCoinsIcon } from '@renderer/assets/Icons/HandCoinsIcon';
import emptyImage from '@renderer/assets/Images/empty-cart.svg';

import { Item } from '../../../components/Item';
import { Modal } from '../../../components/Modal';

import { EmptyImageContainer } from '../../../components/EmptyImageContainer';
import { ListPerDate } from './styles';

interface SalesModalProps {
  open: boolean;
  onClose(): void;
  salesHistory: History<Sale>;
}

export default function SalesModal({
  onClose,
  open,
  salesHistory,
}: SalesModalProps) {
  const hasSales = Object.entries(salesHistory).length > 0;

  return (
    <Modal.Root open={open} onClose={onClose} title="Vendas">
      {!hasSales && (
        <EmptyImageContainer>
          <img src={emptyImage} alt="Sem vendas nesse período" />
          <p>Não encontramos nenhuma venda nesse período</p>
        </EmptyImageContainer>
      )}

      {Object.entries(salesHistory).map(([monthYear, days]) => (
        <ListPerDate key={monthYear}>
          <Modal.Label
            text={capitalizeFirstLetter(formatMonthYear(monthYear))}
          />

          {Object.entries(days).map(([day, sales], index) => (
            <div key={index}>
              <Modal.Description
                text={capitalizeFirstLetter(formatDay(day, monthYear))}
              />

              {sales.map((sale, index) => (
                <Item.Root key={index}>
                  <Item.Box $align="center">
                    <Item.Icon>
                      <HandCoinsIcon size={32} />
                    </Item.Icon>

                    <Item.Box $direction="column" $gap={-7}>
                      <Item.Title
                        text={capitalizeFirstLetter(sale.clientName)}
                      />
                      <Item.Help
                        text={`${sale.quantity} pedidos`}
                        $type="secondary"
                      />
                    </Item.Box>
                  </Item.Box>

                  <Item.Currency
                    text={`R$ ${formatCurrency(sale.value)}`}
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
