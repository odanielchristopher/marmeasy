import { DashboardIcon } from '@renderer/assets/Icons/DashboardIcon';
import DateRangePickerInput from '@renderer/views/components/DateRangePickerInput';
import { SectionHeader } from '@renderer/views/components/SectionHeader';

import useDashboard from './useDashboard';

import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { CheckIcon } from '@renderer/assets/Icons/CheckIcon';
import { ExpenseIcon } from '@renderer/assets/Icons/ExpenseIcon';
import { HandCoinsIcon } from '@renderer/assets/Icons/HandCoinsIcon';
import { IncomeIcon } from '@renderer/assets/Icons/IncomeIcon';
import { Card } from './components/Card';
import CategoriesSection from './components/CategoriesSection';
import Graph from './components/Graph';
import { CardsContainer, Container, FiltersContainer, GraphSection, Main } from './styles';

export default function Dashboard() {
  const { selectedDateRange, handleSelectedDateRange } = useDashboard();

  return (
    <Container>
      <SectionHeader>
        <div>
          <DashboardIcon />
          <h1>Relatórios</h1>
        </div>
        <p>Visualize os relatórios do seu estabelecimento</p>
      </SectionHeader>

      <FiltersContainer>
        <DateRangePickerInput
          value={selectedDateRange}
          onChange={handleSelectedDateRange}
        />
      </FiltersContainer>

      <Main>
        <CardsContainer>
          <Card.Root>
            <Card.Content>
              <Card.Title text="Total de vendas" />
              <Card.Info text="54 vendas" />
            </Card.Content>
            <Card.Icon color="success" height={42}>
              <HandCoinsIcon size={42} />
            </Card.Icon>
          </Card.Root>

          <Card.Root>
            <Card.Content>
              <Card.Title text="Entradas" />
              <Card.Info text={`R$ ${formatCurrency(2321)}`} />
            </Card.Content>
            <Card.Icon color="success" height={42}>
              <IncomeIcon size={42} />
            </Card.Icon>
          </Card.Root>

          <Card.Root>
            <Card.Content>
              <Card.Title text="Saídas" />
              <Card.Info text={`R$ ${formatCurrency(2321)}`} />
            </Card.Content>
            <Card.Icon color="danger" height={42}>
              <ExpenseIcon size={42} />
            </Card.Icon>
          </Card.Root>

          <Card.Root $justify='center'>
            <Card.Content>
              <Card.Header>
                <Card.Icon color='success' height={28}>
                  <CheckIcon width={29} height={28} />
                </Card.Icon>
                <Card.Title text="1° do cardápio" type='secondary'/>
              </Card.Header>
              <Card.Info text="Strogonoff de Frango" />
            </Card.Content>
          </Card.Root>
        </CardsContainer>

        <GraphSection>
          <Graph />
          <CategoriesSection />
        </GraphSection>
      </Main>
    </Container>
  );
}
