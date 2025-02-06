import { Label } from './styles';

interface ModalLabelProps {
  text: string;
}

export function ModalLabel({ text }: ModalLabelProps) {
  return <Label>{text}</Label>;
}
