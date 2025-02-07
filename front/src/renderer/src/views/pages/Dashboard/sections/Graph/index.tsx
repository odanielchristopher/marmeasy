import { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './ChartJs';
import { Container } from './styles';

export default function Graph() {
  const labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Definição dos valores de entradas e saídas por dia
  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Entradas',
        data: [1200, 2300, 1800, 2000, 2500, 1700, 1900],
        backgroundColor: '#089f68dc',
        borderRadius: 18,
      },
      {
        label: 'Saídas',
        data: [900, 1900, 1600, 1400, 2200, 1500, 1300],
        backgroundColor: '#d73036e4',
        borderRadius: 18,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#555' },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#555' },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
      },
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <Container>
      <Bar data={data} options={options} />
    </Container>
  );
}
