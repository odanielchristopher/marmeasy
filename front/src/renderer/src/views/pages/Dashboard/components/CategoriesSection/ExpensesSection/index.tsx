import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { Item } from '../../Item';
import { SectionTitle } from '../styles';
import { Container } from './styles';

export default function ExpensesSection() {
  return (
    <Container>
      <SectionTitle>Categorias de saídas</SectionTitle>
      <div>
        <Item.Root>
          <Item.Box $direction='column'>
            <Item.Title text='Crédito' />
            <Item.Currency text={`R$ ${formatCurrency(120)}`} color='danger'/>
          </Item.Box>
        </Item.Root>
      </div>
    </Container>
  );
}
