import Loader from '@renderer/views/components/Loader';
import { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './ChartJs';
import { Container } from './styles';

interface GraphProps {
  labels: string[];
  incomes: number[];
  expenses: number[];
  $isLoading?: boolean;
}

export default function Graph({
  expenses,
  incomes,
  labels,
  $isLoading,
}: GraphProps) {
  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Entradas',
        data: incomes,
        backgroundColor: '#089f68dc',
        borderRadius: 18,
      },
      {
        label: 'Saídas',
        data: expenses,
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
        ticks: {
          color: '#555',
        },
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
      {!$isLoading && <Bar data={data} options={options} />}

      {$isLoading && <Loader size={24} $isLoading />}
    </Container>
  );
}
