import { MainInfo, MainInfoProps } from './styles';

interface CardInfoProps extends MainInfoProps {
  text: string;
}

export function CardInfo({ text, ...props }: CardInfoProps) {
  return <MainInfo {...props}>{text}</MainInfo>;
}
