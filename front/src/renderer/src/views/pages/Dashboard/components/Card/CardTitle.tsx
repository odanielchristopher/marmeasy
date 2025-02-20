import { Title, TitleProps } from './styles';

interface CardTitleProps extends TitleProps {
  text: string;
}

export function CardTitle({ text, $align: align, type }: CardTitleProps) {
  return (
    <Title $align={align} type={type}>
      {text}
    </Title>
  );
}
