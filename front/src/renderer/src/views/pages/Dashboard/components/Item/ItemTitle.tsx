import { Title } from './styles';

interface ItemTitleProps {
  text: string;
}

export function ItemTitle({ text }: ItemTitleProps) {
  return (
    <Title>{text}</Title>
  );
}
