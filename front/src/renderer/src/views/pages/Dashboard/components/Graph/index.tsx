import './ChartJs';

import { Bar } from 'react-chartjs-2';
import { Container } from './styles';

export default function Graph() {
  return (
    <Container>
      <Bar
        data={{
          labels: ['A', 'B', 'C'],
          datasets: [
            {
              label: 'Teste',
              data: [100, 200, 300, 400],
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </Container>
  );
}
