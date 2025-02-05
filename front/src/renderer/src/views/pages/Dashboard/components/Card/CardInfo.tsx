import { MainInfo } from './styles';

interface CardInfoProps {
  text: string;
}

export function CardInfo({ text }: CardInfoProps) {
  return (
    <MainInfo>
      {text}
    </MainInfo>
  );
}
