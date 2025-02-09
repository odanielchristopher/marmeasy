import { Content, ContentProps } from './styles';

interface CardContentProps extends ContentProps {
  children: React.ReactNode;
}

export function CardContent({ children, ...props }: CardContentProps) {
  return <Content {...props}>{children}</Content>;
}
