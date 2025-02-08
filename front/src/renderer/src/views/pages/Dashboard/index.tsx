import { DashboardIcon } from '@renderer/assets/Icons/DashboardIcon';
import DateRangePickerInput from '@renderer/views/components/DateRangePickerInput';
import { SectionHeader } from '@renderer/views/components/SectionHeader';

import useDashboard from './useDashboard';

import CategoriesSection from './sections/CategoriesSection';
import Graph from './sections/Graph';
import Incomes from './sections/Incomes';
import Sales from './sections/Sales';

import Expenses from './sections/Expenses';
import Favorites from './sections/Favorites';
import {
  CardsContainer,
  Container,
  FiltersContainer,
  GraphSection,
  Main,
} from './styles';

export default function Dashboard() {
  const {
    selectedDateRange,
    labels,
    incomes,
    expenses,
    isLoading,
    handleSelectedDateRange,
  } = useDashboard();

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
        <span>Filtros: </span>

        <DateRangePickerInput
          value={selectedDateRange}
          onChange={handleSelectedDateRange}
        />
      </FiltersContainer>

      <Main>
        <CardsContainer>
          <Sales />

          <Incomes />

          <Expenses />

          <Favorites />
        </CardsContainer>

        <GraphSection>
          <Graph
            labels={labels}
            incomes={incomes}
            expenses={expenses}
            $isLoading={isLoading}
          />

          <CategoriesSection />
        </GraphSection>
      </Main>
    </Container>
  );
}
