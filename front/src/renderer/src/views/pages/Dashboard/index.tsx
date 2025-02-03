import { DashboardIcon } from '@renderer/assets/Icons/DashboardIcon';
import { SectionHeader } from '@renderer/views/components/SectionHeader';
import { Container } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <SectionHeader>
        <div>
          <DashboardIcon />
          <h1>Relatórios</h1>
        </div>
        <p>Visualize os relatórios do seu estabelecimento</p>
      </SectionHeader>
    </Container>
  );
}
