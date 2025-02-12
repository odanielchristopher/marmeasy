import { Header } from './styles';

interface CardHeaderProps {
  children: React.ReactNode;
}

export function CardHeader({ children }: CardHeaderProps) {
  return <Header>{children}</Header>;
}
