import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { ExpenseIcon } from '@renderer/assets/Icons/ExpenseIcon';
import { Item } from '../../Item';
import { SectionTitle } from '../styles';
import { Container } from './styles';

export default function ExpensesSection() {
  return (
    <Container>
      <SectionTitle>Categorias de saídas</SectionTitle>
      <div>
        <Item.Root $hasAction>
          <Item.Box $align="center">
            <Item.Icon height={32}>
              <ExpenseIcon size={32} />
            </Item.Icon>
            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Outras saídas" />
              <Item.Currency
                text={`R$ ${formatCurrency(120)}`}
                color="danger"
              />
            </Item.Box>
          </Item.Box>
        </Item.Root>

        <Item.Root $hasAction>
          <Item.Box $align="center">
            <Item.Icon height={32}>
              <ExpenseIcon size={32} />
            </Item.Icon>
            <Item.Box $direction="column" $gap={-7}>
              <Item.Title text="Outras saídas" />
              <Item.Currency
                text={`R$ ${formatCurrency(120)}`}
                color="danger"
              />
            </Item.Box>
          </Item.Box>
        </Item.Root>
      </div>
    </Container>
  );
}
