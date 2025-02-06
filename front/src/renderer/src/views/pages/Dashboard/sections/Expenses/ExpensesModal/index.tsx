import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import { Item } from '../../../components/Item';
import { Modal } from '../../../components/Modal';
import { AddButton, ListPerDate } from './styles';

interface ExpensesModalProps {
  open: boolean;
  onClose(): void;
}

export default function ExpensesModal({ onClose, open }: ExpensesModalProps) {
  return (
    <Modal.Root
      open={open}
      onClose={onClose}
      title="Saídas"
      action={
        <AddButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M1 8L15 8M8 1L8 15"
              stroke="CurrentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </AddButton>
      }
    >
      <ListPerDate>
        <Modal.Label text="Janeiro, 2025" />
        <Modal.Description text="Sexta, 31 jan. 2025" />

        <Item.Root $hasAction>
          <Item.Box $align="center">
            <Item.Icon height={32}>
              <DashboardCategoryIcon type="expense" icon="default" size={32} />
            </Item.Icon>

            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Outras saídas" />
              <Item.Currency
                text={`R$ ${formatCurrency(120.58)}`}
                color="danger"
              />
            </Item.Box>
          </Item.Box>
        </Item.Root>

        <Item.Root $hasAction>
          <Item.Box $align="center">
            <Item.Icon height={32}>
              <DashboardCategoryIcon type="expense" icon="delivery" size={32} />
            </Item.Icon>

            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Entregas" />
              <Item.Currency
                text={`R$ ${formatCurrency(120.58)}`}
                color="danger"
              />
            </Item.Box>
          </Item.Box>
        </Item.Root>
      </ListPerDate>

      <ListPerDate>
        <Modal.Label text="Dezembro, 2024" />
        <Modal.Description text="Sábado, 31 dez. 2024" />

        <Item.Root $hasAction>
          <Item.Box $align="center">
            <Item.Icon height={32}>
              <DashboardCategoryIcon type="expense" icon="default" size={32} />
            </Item.Icon>

            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Outras saídas" />
              <Item.Currency
                text={`R$ ${formatCurrency(120.58)}`}
                color="danger"
              />
            </Item.Box>
          </Item.Box>
        </Item.Root>
      </ListPerDate>
    </Modal.Root>
  );
}
