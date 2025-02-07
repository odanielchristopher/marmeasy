import { Content } from './styles';

interface CardContentProps {
  children: React.ReactNode;
}

export function CardContent({ children }: CardContentProps) {
  return <Content>{children}</Content>;
}
